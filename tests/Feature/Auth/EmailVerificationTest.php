<?php

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;

uses(RefreshDatabase::class);

test('email verification screen can be rendered', function () {
    $user = User::factory()->unverified()->create();

    $response = $this->actingAs($user)->get('/auth/verify-email');

    $response->assertStatus(200);
});

test('email can be verified', function () {
    $user = User::factory()->unverified()->create();

    Event::fake();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1($user->email)]
    );

    $response = $this->actingAs($user)->get($verificationUrl);

    Event::assertDispatched(Verified::class);
    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    $response->assertRedirect(route('home', absolute: false).'?verified=1');
});

test('email is not verified with invalid hash', function () {
    $user = User::factory()->unverified()->create();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1('wrong-email')]
    );

    $this->actingAs($user)->get($verificationUrl);

    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

test('guest cannot access email verification screen', function () {
    $response = $this->get('/auth/verify-email');

    $response->assertRedirect('/auth/login');
});

test('redirects to home if email is verified', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $response = $this->actingAs($user)->get('/auth/verify-email');

    $response->assertRedirect(route('home', absolute: false));
});

test('renders the email verification prompt if email is not verified', function () {
    $user = User::factory()->unverified()->create();

    $response = $this->actingAs($user)->get('/auth/verify-email');

    $response->assertStatus(200);
});

test('email is marked as verified if not already verified', function () {
    $user = User::factory()->unverified()->create();

    Event::fake();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1($user->email)]
    );

    $response = $this->actingAs($user)->get($verificationUrl);

    Event::assertDispatched(Verified::class, function ($event) use ($user) {
        return $event->user->is($user);
    });

    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    $response->assertRedirect(route('home', absolute: false).'?verified=1');
});

test('redirects to home if email is already verified', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1($user->email)]
    );

    $response = $this->actingAs($user)->get($verificationUrl);

    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    $response->assertRedirect(route('home', absolute: false).'?verified=1');
});
