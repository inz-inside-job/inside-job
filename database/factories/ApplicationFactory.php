<?php

namespace Database\Factories;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ApplicationFactory extends Factory
{
    protected $model = Application::class;

    public function definition(): array
    {
        return [
            'job_id' => Job::factory(),
            'user_id' => User::factory(),
            'status' => ApplicationStatus::APPLIED,
            'applied_date' => now(),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'phone' => $this->faker->phoneNumber,
            'linkedin' => $this->faker->url,
            'portfolio' => $this->faker->url,
            'resume' => $this->faker->word.'.pdf',
            'cover_letter' => $this->faker->paragraph,
        ];
    }
}
