<?php

namespace Database\Factories;

use App\Models\Company;
use Faker\Provider\en_US\Company as FakerCompany;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CompanyFactory extends Factory
{
    protected $model = Company::class;

    public function definition(): array
    {
        $company = new FakerCompany($this->faker);

        return [
            'name' => $company->company(), // Generates a more realistic company name
            'description' => $company->catchPhrase().' '.$company->bs(), // Generates a catchy description
            'logo' => $this->faker->imageUrl(200, 200, 'business', true, 'logo'), // Generates a placeholder logo URL
            'industry' => $this->faker->randomElement([
                'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
                'Manufacturing', 'Media', 'Consulting', 'Non-profit', 'Government',
            ]),
            'location' => $this->faker->city().', '.$this->faker->country(), // Generates a realistic location
            'website' => $this->faker->url(), // Generates a valid website URL
            'employee_count' => $this->faker->numberBetween(10, 10000), // Generates a realistic employee count
            'founded_year' => Carbon::now()->subYears($this->faker->numberBetween(1, 45)), // Generates a random past year
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
