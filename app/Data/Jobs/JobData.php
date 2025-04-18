<?php

namespace App\Data\Jobs;

use App\Enums\EmploymentExperience;
use App\Enums\EmploymentType;
use Spatie\LaravelData\Attributes\LoadRelation;
use Spatie\LaravelData\Data;

class JobData extends Data
{
    #[LoadRelation]
    public JobCompanyData $company;

    public function __construct(
        public int $id,
        public int $company_id,
        public string $slug,
        public string $title,
        public string $location,
        public EmploymentType $employment_type,
        public EmploymentExperience $employment_experience,
        public string $posted_date,
        public int $salary_min,
        public int $salary_max,
        public string $description,
        /** @var string[] */
        public array $requirements,
        public int $visit_count,
        public int $applications_count,
    ) {}
}
