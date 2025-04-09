<?php

use App\Http\Requests\GlobalSearchRequest;
use App\Models\Company;
use App\Models\Job;
use App\Search\GlobalSearch;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery\MockInterface;

uses(RefreshDatabase::class);

it('handles global search requests', function () {
    // Create test models that won't actually hit the database during search
    $company = Company::factory()->make([
        'id' => 1,
        'name' => 'Test Company',
        'slug' => 'test-company',
        'logo' => 'company-logo.png',
    ]);

    $job = Job::factory()->make([
        'id' => 1,
        'title' => 'Test Job',
        'company_id' => 1,
    ]);

    // Mock the company relationship on the job
    $job->setRelation('company', $company);

    // Mock the GlobalSearch class at a low level to avoid any database operations
    $this->mock(GlobalSearch::class, function (MockInterface $mock) use ($company, $job) {
        $mock->shouldReceive('search')
            ->andReturn($mock);

        $mock->shouldReceive('query')
            ->andReturn($mock);

        $mock->shouldReceive('get')
            ->andReturn(new Collection([$company, $job]));
    });

    // Mock the GlobalSearchRequest to avoid validation issues
    $this->mock(GlobalSearchRequest::class, function (MockInterface $mock) {
        $mock->shouldReceive('validated')
            ->with('query')
            ->andReturn('Test');
    });

    $response = $this->get('/search?query=Test');

    $response->assertStatus(200);
});

it('returns an empty array when no results are found', function () {
    $response = $this->get('/search?query=NonExistent');

    $response->assertStatus(200);
    $response->assertExactJson([]);
});
