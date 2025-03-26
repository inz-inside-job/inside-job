<?php

namespace App\Data;

use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class CompanyData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

    public function __construct(
        public int $id,

        #[Required, StringType]
        public string $name,

        #[Required, StringType]
        public string $industry,

        #[StringType]
        public ?string $location,

        #[Required, IntegerType]
        public int $employee_count,

        #[Required, Date]
        public string $founded_year,

        public float $rating,

        public float $average_salary,

        public float $recommend,

        public int $reviews_count,

        ?string $logo,

        public string $description,
    ) {
        $this->logo = $logo;
    }
}
