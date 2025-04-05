<?php

namespace App\Data\CompanySubmission;

use App\Enums\CompanyType;
use Spatie\LaravelData\Data;

class CompanySubmissionData extends Data
{
    public function __construct(
        public string $name,
        public string $industry,
        public string $description,
        public int $employee_count,
        public string $founded_year,
        public string $status,
        public string $created_at,
        public int $id,
        public CompanySubmissionUserData $user,
        public string $ceo,
        public CompanyType $type
    ) {}
}
