<?php

namespace App\Data\Jobs;

use App\Enums\EmploymentExperience;
use App\Enums\EmploymentType;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\GreaterThanOrEqualTo;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

class JobFormData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public string $title,

        #[Required, StringType, Max(255)]
        public string $location,

        #[Required, Enum(EmploymentType::class)]
        public EmploymentType $employment_type,

        #[Required, Enum(EmploymentExperience::class)]
        public EmploymentExperience $employment_experience,

        #[Required, IntegerType, Min(1)]
        public int $salary_min,

        #[Required, IntegerType, Min(1), GreaterThanOrEqualTo('salary_min')]
        public int $salary_max,

        #[Required, StringType]
        public string $description,

        #[Required, ArrayType, Min(1)]
        /** @var string[] */
        public array $requirements,
    ) {}

    public static function rules(): array
    {
        return [
            'requirements.*' => ['string', 'min:1', 'max:255'],
        ];
    }
}
