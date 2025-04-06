<?php

namespace App\Data\CompanySubmission;

use Spatie\LaravelData\Data;

class CompanySubmissionUserData extends Data
{
    public function __construct(
        public string $name,
    ) {}
}
