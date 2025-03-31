<?php

namespace App\Data\Company;

use App\Data\UserData;
use Spatie\LaravelData\Attributes\LoadRelation;
use Spatie\LaravelData\Data;

class CompanyReviewData extends Data
{
    #[LoadRelation]
    public UserData $user;

    public function __construct(
        public int $id,
        public int $company_id,
        public int $user_id,
        public int $rating,
        public string $review,
        /** @var string[] */
        public array $pros,
        /** @var string[] */
        public array $cons,
        public string $position,
        public int $work_life_balance,
        public int $culture_values,
        public int $career_opportunities,
        public int $compensation_benefits,
        public int $senior_management,
        public bool $recommend,
        public bool $approve_of_ceo
    ) {}
}
