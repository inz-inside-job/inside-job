<?php

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;

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
