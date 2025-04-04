<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyReviewRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:1000',
            'pros' => 'required|array',
            'pros.*' => 'string|max:255',
            'cons' => 'required|array',
            'cons.*' => 'string|max:255',
            'position' => 'required|string|max:255',
            'work_life_balance' => 'required|integer|min:1|max:5',
            'culture_values' => 'required|integer|min:1|max:5',
            'career_opportunities' => 'required|integer|min:1|max:5',
            'compensation_benefits' => 'required|integer|min:1|max:5',
            'senior_management' => 'required|integer|min:1|max:5',
            'recommend' => 'required|boolean',
            'approve_of_ceo' => 'required|boolean',
        ];
    }
}
