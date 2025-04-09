<?php

use App\Models\Company;
use App\Models\Job;
use App\Models\Review;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('average salary works with no jobs', function () {
    $company = Company::factory()->create();

    $averageSalary = $company->average_salaray;

    expect($averageSalary)->toBe(0.0);
});

test('average salary works with jobs', function () {
    $company = Company::factory()->create();
    Job::factory(5)->for($company)->create();

    $averageSalary = $company->average_salaray;

    expect($averageSalary)->toBe((float) $company->jobs()->avg('jobs.salary_min'));
});

test('average salary works with scope', function () {
    $company = Company::factory()->create();

    $company = Company::where('companies.id', $company->id)
        ->withAverageSalary()
        ->first();

    $averageSalary = $company->average_salaray;

    expect($averageSalary)->toBe(0.0);
});

test('approve of ceo work with no reviews', function () {
    $company = Company::factory()->create();

    $approveOfCeo = $company->approve_of_ceo;

    expect($approveOfCeo)->toBe(0.0);
});

test('approve of ceo work with reviews', function () {
    $company = Company::factory()->create();
    Review::factory(5)->for($company)->create();

    $approveOfCeo = $company->approve_of_ceo;

    expect($approveOfCeo)->toBe((float) $company->reviews()->where('approve_of_ceo', true)->count() / $company->reviews()->count() * 100);
});

test('approve of ceo work with scope', function () {
    $company = Company::factory()->create();

    $company = Company::where('companies.id', $company->id)
        ->withApproveOfCeo()
        ->first();

    $approveOfCeo = $company->approve_of_ceo;

    expect($approveOfCeo)->toBe(0.0);
});

test('rating works with no reviews', function () {
    $company = Company::factory()->create();

    $rating = $company->rating;

    expect($rating)->toBe(0.0);
});

test('rating works with reviews', function () {
    $company = Company::factory()->create();
    Review::factory(5)->for($company)->create();

    $rating = $company->rating;

    expect($rating)->toBe((float) $company->reviews()->avg('reviews.rating'));
});

test('rating works with scope', function () {
    $company = Company::factory()->create();

    $company = Company::where('companies.id', $company->id)
        ->withRating()
        ->first();

    $rating = $company->rating;

    expect($rating)->toBe(0.0);
});

test('recommend work with no reviews', function () {
    $company = Company::factory()->create();

    $recommend = $company->recommend;

    expect($recommend)->toBe(0.0);
});

test('recommend work with reviews', function () {
    $company = Company::factory()->create();
    Review::factory(5)->for($company)->create();

    $recommend = $company->recommend;

    expect($recommend)->toBe((float) $company->reviews()->where('reviews.recommend', true)->count() / $company->reviews()->count() * 100);
});

test('recommend work with scope', function () {
    $company = Company::factory()->create();

    $company = Company::where('companies.id', $company->id)
        ->withRecommend()
        ->first();

    $recommend = $company->recommend;

    expect($recommend)->toBe(0.0);
});
