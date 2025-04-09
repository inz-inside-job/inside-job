<?php

use App\Enums\CompanyType;
use App\Models\Company;
use App\Models\Review;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->companies = Company::factory(3)->create();
});

describe('CompanyController index method', function () {
    it('fetches companies with default sorting and filtering', function () {
        $response = $this->get(route('companies'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('companies')
                ->has('companies')
                ->has('next_cursor')
        );
    });

    it('filters companies by query parameter', function () {
        $specialCompany = Company::factory()->create(['name' => 'Special Testing Corp']);

        $response = $this->get('/companies?query=Special');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->has('companies', 1, fn ($company) => $company->where('name', 'Special Testing Corp')));
    });

    it('sorts companies by rating', function () {
        // Create reviews to generate ratings
        foreach ($this->companies as $index => $company) {
            Review::factory()->count(3)->create([
                'company_id' => $company->id,
                'rating' => 5 - $index, // First company gets highest rating
            ]);
        }

        $response = $this->get('/companies?sort=rating');

        $response->assertStatus(200);
    });

    it('filters companies by industry', function () {
        $response = $this->get('/companies?filter[industry]=Industry 1');

        $response->assertStatus(200);
    });

    it('filters companies by company size', function () {
        $smallCompany = Company::factory()->create(['employee_count' => 50]);
        $mediumCompany = Company::factory()->create(['employee_count' => 500]);
        $largeCompany = Company::factory()->create(['employee_count' => 5000]);

        $response = $this->get('/companies?filter[company_sizes]=1,100;101,500');

        $response->assertStatus(200);
    });

    it('filters companies by minimum rating', function () {
        // Create reviews with different ratings
        Review::factory()->create([
            'company_id' => $this->companies[0]->id,
            'rating' => 5,
        ]);

        Review::factory()->create([
            'company_id' => $this->companies[1]->id,
            'rating' => 2,
        ]);

        $response = $this->get('/companies?filter[min_rating]=4');

        $response->assertStatus(200);
    });
});

describe('CompanyController show method', function () {
    it('fetches a specific company with all its relations', function () {
        $company = Company::factory()->create(['name' => 'Test Company']);
        Review::factory()->count(3)->create(['company_id' => $company->id]);

        $response = $this->get(route('companies.show', $company->slug));

        $response->assertStatus(200);
    });

    it('returns 404 when company slug does not exist', function () {
        $response = $this->get(route('companies.show', 'non-existent-company'));

        $response->assertStatus(404);
    });
});

describe('CompanyController submitClaim method', function () {
    it('creates a company claim submission', function () {
        $user = User::factory()->create();
        $company = Company::factory()->create();

        $response = $this->actingAs($user)->post(route('companies.submitClaim', $company), [
            'job_title' => 'Software Engineer',
            'email' => 'test@example.com',
            'verification_details' => 'I am an employee of this company.',
        ]);

        $response->assertSuccessful();
        $this->assertDatabaseHas('claim_company_submission', [
            'company_id' => $company->id,
            'user_id' => $user->id,
            'job_title' => 'Software Engineer',
            'email' => 'test@example.com',
        ]);
    });

    it('validates the claim submission request', function () {
        $user = User::factory()->create();
        $company = Company::factory()->create();

        $response = $this->actingAs($user)
            ->post(route('companies.submitClaim', $company), [
                'job_title' => '',
                'email' => 'not-an-email',
                'verification_details' => '',
            ]);

        $response->assertSessionHasErrors(['job_title', 'email', 'verification_details']);
    });
});

describe('CompanyController storeReview method', function () {
    it('stores a review for a company', function () {
        $user = User::factory()->create();
        $company = Company::factory()->create();
        Session::setPreviousUrl(route('companies.show', $company->slug));

        $response = $this->actingAs($user)->post(route('companies.reviews.store', $company), [
            'rating' => 5,
            'review' => 'Great company!',
            'pros' => ['Good benefits'],
            'cons' => ['Long hours'],
            'position' => 'Engineer',
            'work_life_balance' => 4,
            'culture_values' => 5,
            'career_opportunities' => 4,
            'compensation_benefits' => 5,
            'senior_management' => 3,
            'recommend' => true,
            'approve_of_ceo' => true,
        ]);

        $response->assertRedirect(route('companies.show', $company->slug));
        $response->assertSessionHas('success', 'Review submitted successfully.');
        $this->assertDatabaseHas('reviews', [
            'company_id' => $company->id,
            'user_id' => $user->id,
            'rating' => 5,
            'review' => 'Great company!',
        ]);
    });

    it('prevents duplicate reviews', function () {
        $user = User::factory()->create();
        $company = Company::factory()->create();
        Review::factory()->for($company)->for($user)->create();

        $response = $this->actingAs($user)->post(route('companies.reviews.store', $company), [
            'rating' => 5,
            'review' => 'Great company!',
            'pros' => ['Good benefits'],
            'cons' => ['Long hours'],
            'position' => 'Engineer',
            'work_life_balance' => 4,
            'culture_values' => 5,
            'career_opportunities' => 4,
            'compensation_benefits' => 5,
            'senior_management' => 3,
            'recommend' => true,
            'approve_of_ceo' => true,
        ]);

        $response->assertRedirect();
        $response->assertSessionHasErrors();
    });
});

describe('CompanyController submit method', function () {
    it('submits a new company', function () {
        $user = User::factory()->create();
        $now = Carbon::now()->toAtomString();

        $response = $this->actingAs($user)->post(route('companies.submit'), [
            'name' => 'New Test Company',
            'industry' => 'Technology',
            'description' => 'A newly submitted company',
            'employee_count' => 500,
            'founded_year' => $now,
            'ceo' => 'John Doe',
            'type' => CompanyType::PUBLIC->value,
        ]);

        $response->assertRedirect(route('companies'));
        $response->assertSessionHas('success', 'Company submission received successfully.');
        $this->assertDatabaseHas('company_submissions', ['name' => 'New Test Company', 'user_id' => $user->id]);
    });
});
