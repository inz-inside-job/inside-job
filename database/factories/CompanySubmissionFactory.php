<?php

namespace Database\Factories;

use App\Enums\CompanySubmissionStatus;
use App\Models\CompanySubmission;
use App\Models\User;
use Faker\Provider\en_US\Company as FakerCompany;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CompanySubmissionFactory extends Factory
{
    protected $model = CompanySubmission::class;

    public function definition(): array
    {
        $company = new FakerCompany($this->faker);

        return [
            'name' => $company->company(), // Generates a more realistic company name
            'description' => $company->catchPhrase().' '.$company->bs(), // Generates a catchy description
            'industry' => $this->faker->randomElement([
                'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
                'Manufacturing', 'Media', 'Consulting', 'Non-profit', 'Government',
            ]),
            'employee_count' => $this->faker->numberBetween(10, 10000), // Generates a realistic employee count
            'founded_year' => Carbon::now()->subYears($this->faker->numberBetween(1, 45)), // Generates a random past year
            'status' => $this->faker->randomElement(array_column(CompanySubmissionStatus::cases(), 'value')),
            'user_id' => User::factory(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
