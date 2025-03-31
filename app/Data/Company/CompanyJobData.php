<?php

namespace App\Data\Company;

use App\Enums\EmploymentType;
use Spatie\LaravelData\Data;

class CompanyJobData extends Data
{
    public function __construct(
        public int $id,
        public int $company_id,
        public string $title,
        public string $location,
        public EmploymentType $employment_type,
        public string $posted_date,
        public ?string $salary_range,
        public string $description,
        public string $slug,
        /** @var array<string> */
        public array $requirements,
        public int $salary_min,
        public int $salary_max,
    ) {}
}
