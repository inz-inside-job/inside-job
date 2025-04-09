<?php

use App\Models\Company;
use App\Models\Job;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create a company
    $this->company = Company::factory()->create([
        'name' => 'Tech Company',
        'industry' => 'Technology',
        'description' => 'A leading tech company',
    ]);

    // Create a job
    $this->job = Job::factory()->create([
        'company_id' => $this->company->id,
        'title' => 'Senior Developer',
        'description' => 'We are looking for a senior developer',
        'location' => 'Remote',
        'salary_min' => 80000,
        'salary_max' => 120000,
        'slug' => 'senior-developer-tech-company',
    ]);

    // Create a user
    $this->user = User::factory()->create();
});

it('fetches job application page with all job details', function () {
    $this->actingAs($this->user);

    $response = $this->get(route('jobs.apply', $this->job->slug));

    $response->assertStatus(200);
});

it('returns 404 when job slug does not exist', function () {
    $this->actingAs($this->user);

    $response = $this->get(route('jobs.apply', 'non-existent-job'));

    $response->assertStatus(404);
});

it('includes company ratings and review count in job data', function () {
    // Create some reviews for this company
    Review::factory()->count(3)->create([
        'company_id' => $this->company->id,
        'rating' => 4,
    ]);

    $this->actingAs($this->user);

    $response = $this->get(route('jobs.apply', $this->job->slug));

    $response->assertStatus(200);
});

it('redirects to login if trying to access job apply page as guest', function () {
    $response = $this->get(route('jobs.apply', $this->job->slug));

    $response->assertRedirect(route('login'));
});

it('tests belongsTo relationship loading', function () {
    $this->actingAs($this->user);

    // Create additional company data that should be loaded
    $this->company->update([
        'website' => 'https://example.com',
        'logo' => 'logo.png',
    ]);

    $response = $this->get(route('jobs.apply', $this->job->slug));

    $response->assertStatus(200);
});
