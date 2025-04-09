<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('password settings page is displayed', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/settings/password');

    $response->assertOk();
});
