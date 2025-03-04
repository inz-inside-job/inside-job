<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Salary;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class SalaryFactory extends Factory
{
    protected $model = Salary::class;

    public function definition(): array
    {
        return [
            'job_title' => $this->faker->word(),
            'salary_amount' => $this->faker->randomFloat(),
            'location' => $this->faker->word(),
            'submitted_date' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'user_id' => User::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
