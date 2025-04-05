<?php

namespace Database\Factories;

use App\Enums\CompanySubmissionStatus;
use App\Models\Company;
use App\Models\CompanyClaimSubmission;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CompanyClaimSubmissionFactory extends Factory
{
    protected $model = CompanyClaimSubmission::class;

    public function definition(): array
    {
        return [
            'updated_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'status' => $this->faker->randomElement(array_column(CompanySubmissionStatus::cases(), 'value')),
            'verification_details' => $this->faker->word(),
            'email' => $this->faker->unique()->safeEmail(),
            'job_title' => $this->faker->word(),

            'user_id' => User::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
