<?php

namespace Database\Factories;

use App\Enums\EmploymentType;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),
            'location' => $this->faker->word(),
            'employment_type' => $this->faker->randomElement([array_column(EmploymentType::cases(), 'value')]),
            'posted_date' => Carbon::now(),
            'salary_range' => $this->faker->word(),
            'description' => $this->faker->text(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'company_id' => Company::factory(),
        ];
    }
}
