<?php

namespace App\Data;

use App\Enums\EmploymentType;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;

class JobData extends Data
{
    public function __construct(public int $id,
        public int $company_id,
        public string $title,
        public string $location,
        public EmploymentType $employment_type,
        public string $posted_date,
        public ?string $salary_range,
        public string $description,
        public string $slug,
    ) {}
}
