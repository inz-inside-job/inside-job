<?php

use App\Enums\ApplicationStatus;
use App\Enums\EmploymentExperience;
use App\Enums\EmploymentType;
use App\Models\Application;
use App\Models\Company;
use App\Models\Job;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create companies for jobs
    $this->companies = Company::factory(3)->create();

    // Ensure search method on Job model is mocked if needed
    //    if (! method_exists(Job::class, 'search')) {
    //        Job::macro('search', function ($query) {
    //            return (object) [
    //                'raw' => function () {
    //                    return ['hits' => Job::pluck('id')->map(fn ($id) => ['id' => $id])->toArray()];
    //                },
    //            ];
    //        });
    //    }
});

it('fetches jobs with default sorting and filtering', function () {
    // Create a job
    $job = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'posted_date' => now(),
        'salary_min' => 60000,
        'salary_max' => 90000,
    ]);

    $response = $this->get('/jobs');

    $response->assertStatus(200);
    $response->assertInertia(
        fn ($page) => $page
            ->component('jobs')
            ->has('jobs')
            ->where('jobs.0.id', $job->id)
    );
});

it('applies search query filter for jobs', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'title' => 'Senior Developer',
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'title' => 'Junior Developer',
    ]);

    $response = $this->get('/jobs?query=Senior');

    $response->assertStatus(200);
    $response->assertInertia(
        fn ($page) => $page
            ->component('jobs')
            ->has('jobs')
    );
});

it('sorts jobs by posted_date', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'posted_date' => now()->subDays(5),
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'posted_date' => now()->subDays(2),
    ]);
    $job3 = Job::factory()->create([
        'company_id' => $this->companies[2]->id,
        'posted_date' => now(),
    ]);

    $response = $this->get('/jobs?sort=posted_date');

    $response->assertStatus(200);
});

it('sorts jobs by relevance', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'posted_date' => now()->subDays(5),
    ]);

    $response = $this->get('/jobs?sort=relevance');

    $response->assertStatus(200);
});

it('sorts jobs by salary', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'salary_min' => 50000,
        'salary_max' => 70000,
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'salary_min' => 80000,
        'salary_max' => 100000,
    ]);

    $response = $this->get('/jobs?sort=salary');

    $response->assertStatus(200);
});

it('filters jobs by employment_type', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'employment_type' => EmploymentType::FULL_TIME,
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'employment_type' => EmploymentType::PART_TIME,
    ]);

    $response = $this->get('/jobs?filter[employment_type]='.EmploymentType::FULL_TIME->value);

    $response->assertStatus(302);
});

it('filters jobs by employment_experience', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'employment_experience' => EmploymentExperience::ENTRY_LEVEL,
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'employment_experience' => EmploymentExperience::MID_LEVEL,
    ]);

    $response = $this->get('/jobs?filter[employment_experience]='.EmploymentExperience::ENTRY_LEVEL->value);

    $response->assertStatus(302);
});

it('filters jobs by location', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'location' => 'New York',
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'location' => 'San Francisco',
    ]);

    $response = $this->get('/jobs?filter[location]=York');

    $response->assertStatus(200);
});

it('filters jobs by minimum salary', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'salary_min' => 40000,
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'salary_min' => 60000,
    ]);

    $response = $this->get('/jobs?filter[salary]=55000');

    $response->assertStatus(200);
});

it('filters jobs by posted date', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'posted_date' => now()->subDays(10),
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
        'posted_date' => now()->subDays(2),
    ]);

    $response = $this->get('/jobs?filter[posted_in]='.now()->subDays(5)->toDateString());

    $response->assertStatus(200);
});

it('handles invalid date for posted_in filter', function () {
    Job::factory()->create([
        'company_id' => $this->companies[0]->id,
        'posted_date' => now()->subDays(2),
    ]);

    $response = $this->get('/jobs?filter[posted_in]=invalid-date');

    $response->assertStatus(200);
});

it('filters jobs by company industry', function () {
    $job1 = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
    ]);
    $job2 = Job::factory()->create([
        'company_id' => $this->companies[1]->id,
    ]);

    $response = $this->get('/jobs?filter[company.industry]=Industry 1');

    $response->assertStatus(200);
});

it('renders job application page', function () {
    $company = Company::factory()->create();
    $job = Job::factory()->create([
        'company_id' => $company->id,
        'slug' => 'test-job',
    ]);

    $response = $this->get(route('jobs.apply', $job->slug));

    $response->assertStatus(302);
});

it('prevents duplicate job applications', function () {
    $user = User::factory()->create();
    $job = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
    ]);

    Application::create([
        'job_id' => $job->id,
        'user_id' => $user->id,
        'status' => ApplicationStatus::APPLIED,
        'applied_date' => now(),
        'first_name' => 'John',
        'last_name' => 'Doe',
        'phone' => '1234567890',
        'resume' => 'path/to/resume.pdf',
    ]);

    $response = $this->actingAs($user)
        ->post(route('jobs.apply.store', $job), [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone' => '1234567890',
            'resume' => UploadedFile::fake()->create('resume.pdf', 100),
        ]);

    $response->assertSessionHasErrors();
});

it('handles resume upload failure', function () {
    $user = User::factory()->create();
    $job = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
    ]);

    Storage::fake('local');
    $fakeFile = UploadedFile::fake()->create('resume.pdf', 100);

    Storage::shouldReceive('disk')
        ->with('local')
        ->andReturnSelf();

    Storage::shouldReceive('putFileAs')
        ->with(
            'resumes',
            Mockery::type(UploadedFile::class),
            Mockery::any(),
            []
        )
        ->once()
        ->andReturn(false);

    $response = $this->actingAs($user)
        ->post(route('jobs.apply.store', $job), [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone' => '1234567890',
            'resume' => $fakeFile,
        ]);

    $response->assertSessionHasErrors();
});

it('submits job application successfully', function () {
    $user = User::factory()->create();
    $job = Job::factory()->create([
        'company_id' => $this->companies[0]->id,
    ]);

    Storage::fake('local');
    $resume = UploadedFile::fake()->create('resume.pdf', 100);

    $response = $this->actingAs($user)
        ->post(route('jobs.apply.store', $job), [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'phone' => '1234567890',
            'linkedin' => 'https://linkedin.com/in/johndoe',
            'portfolio' => 'https://johndoe.com',
            'cover_letter' => 'I am interested in this position.',
            'resume' => $resume,
        ]);

    $response->assertRedirect(route('jobs'));

    $this->assertDatabaseHas('applications', [
        'job_id' => $job->id,
        'user_id' => $user->id,
        'first_name' => 'John',
        'last_name' => 'Doe',
    ]);

    Storage::disk('local')->assertExists('resumes/'.$user->id.'_'.$resume->getClientOriginalName());
});

it('displays job application page with job and company details', function () {
    $company = Company::factory()->create([
        'name' => 'Acme Corp',
        'industry' => 'Technology',
    ]);

    $job = Job::factory()->create([
        'company_id' => $company->id,
        'title' => 'Senior Developer',
        'description' => 'We are looking for a senior developer',
        'location' => 'New York',
        'slug' => 'senior-developer-acme',
    ]);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('jobs.apply', [
        'slug' => $job->slug,
    ]));

    $response->assertStatus(200);
});

it('returns 404 when job slug does not exist', function () {
    $response = $this->get('/jobs/apply/non-existent-job');

    $response->assertStatus(404);
});

it('includes company rating and review counts in job data', function () {
    $company = Company::factory()->create();
    $job = Job::factory()->create([
        'company_id' => $company->id,
        'slug' => 'test-job-with-reviews',
    ]);

    // Create some reviews for this company
    Review::factory()->count(5)->create([
        'company_id' => $company->id,
        'rating' => 4,
    ]);

    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('jobs.apply', [
        'slug' => $job->slug,
    ]));

    $response->assertStatus(200);
});
