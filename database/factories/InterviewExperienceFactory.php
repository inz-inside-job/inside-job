<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\InterviewExperience;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class InterviewExperienceFactory extends Factory
{
    protected $model = InterviewExperience::class;

    public function definition(): array
    {
        return [
            'job_title' => $this->faker->word(),
            'difficulty_level' => $this->faker->word(),
            'interview_questions' => $this->faker->word(),
            'overall_experience' => $this->faker->word(),
            'submitted_date' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'user_id' => User::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
