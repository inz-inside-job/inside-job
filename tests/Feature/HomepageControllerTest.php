<?php

use App\Models\Review;

it('fetches reviews for homepage', function () {
    Review::factory()->count(5)->create();

    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertSee('reviews');
});
