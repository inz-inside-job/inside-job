<?php

use App\Models\User;

it('homepage returns a successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

it('homepage returns a successful response for authenticated user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/');

    $response->assertStatus(200);
});
