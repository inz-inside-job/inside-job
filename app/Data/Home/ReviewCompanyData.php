<?php

namespace App\Data\Home;

use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class ReviewCompanyData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public string $logo;

    public function __construct(
        public int $id,
        public string $name,
        string $logo
    ) {
        $this->logo = $logo;
    }
}
