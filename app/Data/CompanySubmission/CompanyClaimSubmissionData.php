<?php

namespace App\Data\CompanySubmission;

use Spatie\LaravelData\Data;

class CompanyClaimSubmissionData extends Data
{
    public function __construct(
        public string $job_title,
        public string $verification_details,
        public string $email,
        public string $created_at,
        public int $id,
        public string $status,
        public CompanySubmissionUserData $user,
        public CompanyClaimSubmissionCompanyData $company,
    ) {}
}
