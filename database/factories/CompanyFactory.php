<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CompanyFactory extends Factory
{
    protected $model = Company::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'logo' => $this->faker->word(),
            'industry' => $this->faker->word(),
            'location' => $this->faker->word(),
            'website' => $this->faker->word(),
            'employee_count' => $this->faker->randomNumber(),
            'founded_year' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
