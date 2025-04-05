<?php

namespace App\Data\Search;

use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class SearchResultData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

    public function __construct(
        public string $id,
        public string $name,
        public string $link,
        public string $description,
        ?string $logo,
    ) {
        $this->logo = $logo;
    }
}
