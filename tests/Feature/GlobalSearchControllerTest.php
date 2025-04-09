<?php

use App\Models\Company;
use App\Models\Job;

it('handles global search requests', function () {
    Company::factory()->create(['name' => 'Test Company']);
    Job::factory()->create(['title' => 'Test Job']);

    $response = $this->get('/search?query=Test');

    $response->assertStatus(200);
    //    $response->assertJsonFragment(['name' => 'Test Company']);
    //    $response->assertJsonFragment(['name' => 'Test Job']);
});
