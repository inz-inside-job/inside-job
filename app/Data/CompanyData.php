<?php

namespace App\Data;

use App\Enums\CompanyType;
use App\Transformers\PublicStorageTransformer;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class CompanyData extends Data
{
    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $logo;

    public string $founded_year;

    #[WithTransformer(PublicStorageTransformer::class)]
    public ?string $header;
    /**
     * Summary of __construct
     * @param int $id
     * @param string $name
     * @param string $industry
     * @param mixed $location
     * @param int $employee_count
     * @param string $founded_year
     * @param float $rating
     * @param float $average_salary
     * @param float $recommend
     * @param int $reviews_count
     * @param mixed $logo
     * @param string $description
     * @param string $slug
     * @param mixed $header
     * @param string $ceo
     * @param mixed $mission
     * @param array<string> $benefits
     * @param \App\Enums\CompanyType $type
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $industry,
        public ?string $location,
        public int $employee_count,
        string $founded_year,
        public float $rating,
        public float $average_salary,
        public float $recommend,
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
    ) {
        $this->logo = $logo;
        $this->founded_year = $founded_year;
        $this->header = $header;
    }
}
