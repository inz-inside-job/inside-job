<?php

namespace App\Data\CompanySubmission;

use Spatie\LaravelData\Data;

class CompanySubmissionCountsData extends Data
{
    public function __construct(
        public int $pending,
        public int $approved,
        public int $rejected,
        public int $total
    ) {}
}
