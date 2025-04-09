<?php

use App\Data\CompanySubmission\CompanyClaimSubmissionData;
use App\Data\CompanySubmission\CompanySubmissionCountsData;
use App\Data\CompanySubmission\CompanySubmissionData;
use App\Models\Company;
use App\Models\CompanyClaimSubmission;
use App\Models\CompanySubmission;

describe('CompanySubmission tests', function () {
    it('CompanyClaimSubmissionData', function () {
        $company = Company::factory()->create();
        $user = \App\Models\User::factory()->create();
        $claim = CompanyClaimSubmission::factory()->for($company)->for($user)->create();

        $claim->load('user');
        $claim->load('company');

        CompanyClaimSubmissionData::from($claim);

        $this->assertTrue(true);
    });

    it('CompanySubmissionData test', function () {
        $user = \App\Models\User::factory()->create();
        $claim = CompanySubmission::factory()->for($user)->create();

        $claim->load('user');
        $claim->load('company');

        CompanySubmissionData::from($claim);

        $this->assertTrue(true);
    });

    it('CompanySubmissionCountsData test', function () {
        $user = \App\Models\User::factory()->create();
        $company = Company::factory()->create();
        $submission = CompanySubmission::factory()->for($user)->create();

        $submission->load('user');
        $submission->load('company');

        $aggregates = CompanySubmission::query()
            ->selectRaw("
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
                COUNT(*) AS total
            ")
            ->first()
            ->toArray();

        CompanySubmissionCountsData::from($aggregates);

        $this->assertTrue(true);
    });
});
