<?php

namespace App\Http\Requests;

use App\Enums\EmploymentExperience;
use App\Enums\EmploymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class JobIndexRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'query' => 'sometimes|string',
            'filter.employment_type' => ['sometimes', 'array'],
            'filter.employment_type.*' => [Rule::enum(EmploymentType::class)],
            'filter.employment_experience' => ['sometimes', 'array'],
            'filter.employment_experience.*' => [Rule::enum(EmploymentExperience::class)],
            'filter.location' => 'sometimes|string',
            'filter.salary' => 'sometimes|string',
            'filter.posted_in' => 'sometimes|string',
            'sort' => 'sometimes|string',
            'cursor' => 'sometimes|string',
        ];
    }
}
