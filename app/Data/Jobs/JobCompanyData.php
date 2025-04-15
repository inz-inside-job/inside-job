<?php

namespace App\Data\Jobs;

use App\Enums\CompanyType;
use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class JobCompanyData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

    public function __construct(
        public string $name,
        public string $description,
        public string $slug,
        public float $rating,
        public int $reviews_count,
        public string $industry,
        public int $employee_count,
        public string $founded_year,
        public CompanyType $type,
        public string $ceo,
        public ?string $website,
        ?string $logo,
    ) {
        $this->logo = $logo;
    }
}
