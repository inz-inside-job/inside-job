<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'company_id' => ['required', 'exists:companies'],
            'title' => ['required'],
            'location' => ['required'],
            'employment_type' => ['required'],
            'posted_date' => ['required', 'date'],
            'salary_range' => ['nullable'],
            'description' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
