<?php

use App\Data\Search\SearchResultData;
use App\Models\Company;
use App\Models\Job;

it('SearchResultData test', function () {
    $user = \App\Models\User::factory()->create();
    $company = Company::factory()->create();
    $job = Job::factory()->for($company)->create();

    $job->load('company');

    $company->load('jobs');

    $searchResult = SearchResultData::from([...$company->toArray(), 'link' => 'test']);

    $this->assertTrue(true);
});
