<?php

namespace App\Data\Company;

use App\Enums\CompanyType;
use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\LoadRelation;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class CompanyData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $header;

    /** @var array<CompanyJobData> */
    #[LoadRelation]
    public array $jobs;

    /** @var array<CompanyReviewData> */
    #[LoadRelation]
    public array $reviews;

    public function __construct(
        public int $id,
        public string $name,
        public string $industry,
        public ?string $location,
        public int $employee_count,
        public string $founded_year,
        public float $rating,
        public float $average_salary,
        public float $recommend,
        public float $approve_of_ceo,
        public int $reviews_count,
        ?string $logo,
        public string $description,
        public string $slug,
        ?string $header,
        public string $ceo,
        public ?string $mission,
        /** @var string[] */
        public array $benefits,
        public CompanyType $type,
        public int $jobs_count,
        public string $website,
        public bool $claimed,
    ) {
        $this->logo = $logo;
        $this->header = $header;
    }
}
