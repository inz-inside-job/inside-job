<?php

namespace App\Data\CompanySubmission;

use Spatie\LaravelData\Data;

class CompanyClaimSubmissionCompanyData extends Data
{
    public function __construct(
        public string $name,
        public string $industry,
        public int $id
    ) {}
}
