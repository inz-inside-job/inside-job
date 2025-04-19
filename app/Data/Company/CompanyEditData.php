<?php

namespace App\Data\Company;

use App\Enums\CompanyType;
use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class CompanyEditData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $header;

    public function __construct(
        public string $name,
        ?string $logo,
        ?string $header,
        public string $description,
        public string $website,
        public string $industry,
        public string $location,
        public int $employee_count,
        public string $ceo,
        public ?string $mission,
        /** @var string[] */
        public array $benefits,
        public CompanyType $type,
        public string $slug,
        public int $id
    ) {
        $this->logo = $logo;
        $this->header = $header;

    }
}
