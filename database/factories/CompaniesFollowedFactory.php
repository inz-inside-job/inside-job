<?php

namespace Database\Factories;

use App\Models\CompaniesFollowed;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CompaniesFollowedFactory extends Factory
{
    protected $model = CompaniesFollowed::class;

    public function definition(): array
    {
        return [
            'followed_date' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'user_id' => User::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
