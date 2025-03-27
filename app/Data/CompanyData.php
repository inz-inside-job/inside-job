<?php

namespace App\Data;

use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class CompanyData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

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
        public int $reviews_count,
        ?string $logo,
        public string $description,
        public string $slug,
    ) {
        $this->logo = $logo;
    }
}
