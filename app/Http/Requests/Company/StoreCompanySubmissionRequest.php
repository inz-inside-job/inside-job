<?php

namespace App\Http\Requests\Company;

use App\Enums\CompanyType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCompanySubmissionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'employee_count' => 'required|integer|min:1',
            'founded_year' => 'required|date',
            'ceo' => 'required|string|max:255',
            'type' => ['required', Rule::enum(CompanyType::class)],
        ];
    }
}
