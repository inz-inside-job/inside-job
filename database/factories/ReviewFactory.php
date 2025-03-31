<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'rating' => $this->faker->numberBetween(1, 5),
            'review' => $this->faker->text(),
            'pros' => $this->faker->words(5),
            'cons' => $this->faker->words(5),
            'position' => $this->faker->word(),
            'work_life_balance' => $this->faker->numberBetween(1, 5),
            'culture_values' => $this->faker->numberBetween(1, 5),
            'career_opportunities' => $this->faker->numberBetween(1, 5),
            'compensation_benefits' => $this->faker->numberBetween(1, 5),
            'senior_management' => $this->faker->numberBetween(1, 5),
            'recommend' => $this->faker->boolean(),
            'approve_of_ceo' => $this->faker->boolean(),
            'submitted_date' => $this->faker->dateTime(),

            'user_id' => User::factory(),
            'company_id' => Company::factory(),
        ];
    }
}
