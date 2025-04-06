<?php

namespace App\Data\Jobs;

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
        ?string $logo,
    ) {
        $this->logo = $logo;
    }
}
