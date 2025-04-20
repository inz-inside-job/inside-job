<?php

namespace App\Http\Requests\Company;

use App\Enums\CompanyType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCompanyRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'logo' => 'nullable|image|max:2048',
            'header' => 'nullable|image|max:2048',
            'website' => 'nullable|url|max:255',
            'industry' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'mission' => 'nullable|string|max:1000',
            'employee_count' => 'required|integer|min:1',
            'type' => ['required', Rule::enum(CompanyType::class)],
            'ceo' => 'required|string|max:255',
            'benefits' => 'nullable|array',
            'benefits.*' => 'string|max:255',
        ];
    }
}
