<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('redirects to home if email is verified', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $response = $this->actingAs($user)->get('/auth/verify-email');

    $response->assertRedirect(route('home', absolute: false));
});

it('renders the email verification prompt if email is not verified', function () {
    $user = User::factory()->unverified()->create();

    $response = $this->actingAs($user)->get('/auth/verify-email');

    $response->assertStatus(200);
});
