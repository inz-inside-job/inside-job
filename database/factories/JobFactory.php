<?php

namespace Database\Factories;

use App\Enums\EmploymentExperience;
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
        // Define realistic salary ranges
        $salaryMin = $this->faker->numberBetween(500, 5000);
        $salaryMax = $salaryMin + $this->faker->numberBetween(500, 5000);

        return [
            'title' => $this->faker->jobTitle(),
            'location' => $this->faker->city().', '.$this->faker->country(),
            'employment_type' => $this->faker->randomElement(array_column(EmploymentType::cases(), 'value')),
            'employment_experience' => $this->faker->randomElement(array_column(EmploymentExperience::cases(), 'value')),
            'posted_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'salary_min' => $salaryMin,
            'salary_max' => $salaryMax,
            'description' => $this->faker->paragraphs(3, true),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'company_id' => Company::factory(),
        ];
    }
}
