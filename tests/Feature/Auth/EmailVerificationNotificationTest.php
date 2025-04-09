<?php

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('email verification notification is not sent if email is already verified', function () {
    Notification::fake();

    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $response = $this->actingAs($user)->post(route('verification.send'));

    $response->assertRedirect(route('home', absolute: false));
    Notification::assertNothingSent();
});

test('email verification notification is sent if email is not verified', function () {
    Notification::fake();

    $user = User::factory()->unverified()->create();

    $response = $this->actingAs($user)->post(route('verification.send'));

    $response->assertRedirect();
    $response->assertSessionHas('status', 'verification-link-sent');
    Notification::assertSentTo($user, VerifyEmail::class);
});

test('does not throw exception if rate limit is not exceeded', function () {
    RateLimiter::shouldReceive('tooManyAttempts')
        ->once()
        ->with('test-key', 5)
        ->andReturn(false);

    $mockRequest = new class extends \App\Http\Requests\Auth\LoginRequest
    {
        public function throttleKey(): string
        {
            return 'test-key';
        }
    };

    $mockRequest->ensureIsNotRateLimited();
    $this->assertTrue(true); // Ensure no exception is thrown
});

test('throws exception if rate limit is exceeded', function () {
    RateLimiter::shouldReceive('tooManyAttempts')
        ->once()
        ->with('test-key', 5)
        ->andReturn(true);

    RateLimiter::shouldReceive('availableIn')
        ->once()
        ->with('test-key')
        ->andReturn(60);

    Event::fake();

    $mockRequest = new class extends \App\Http\Requests\Auth\LoginRequest
    {
        public function throttleKey(): string
        {
            return 'test-key';
        }
    };

    $this->expectException(ValidationException::class);
    $this->expectExceptionMessage(__('auth.throttle', ['seconds' => 60, 'minutes' => 1]));

    $mockRequest->ensureIsNotRateLimited();

    Event::assertDispatched(Lockout::class);
});
