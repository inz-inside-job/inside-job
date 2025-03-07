<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'industry' => ['required'],
            'location' => ['nullable'],
            'website' => ['nullable'],
            'employee_count' => ['required', 'integer'],
            'founded_year' => ['required', 'date'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
