<?php

namespace App\Data\Applications;

use App\Enums\ApplicationStatus;
use Spatie\LaravelData\Attributes\LoadRelation;
use Spatie\LaravelData\Data;

class ApplicationData extends Data
{
    #[LoadRelation]
    public ApplicationJobData $job;

    #[LoadRelation]
    public ApplicationUserData $user;

    public function __construct(
        public int $id,
        public ApplicationStatus $status,
        public string $applied_date,
        public string $first_name,
        public string $last_name,
        public string $phone,
        public string $linkedin,
        public string $portfolio,
        public string $resume,
        public string $cover_letter,
    ) {}
}
