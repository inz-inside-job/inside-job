<?php

namespace App\Data\Company;

use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class CompanyDashboardData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

    public function __construct(
        public int $id,
        public string $name,
        public string $location,
        public string $description,
        public string $industry,
        public int $employee_count,
        public string $slug,

        ?string $logo,
    ) {
        $this->logo = $logo;
    }
}
