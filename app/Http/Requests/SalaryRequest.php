<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalaryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users'],
            'company_id' => ['required', 'exists:companies'],
            'job_title' => ['required'],
            'salary_amount' => ['required', 'numeric'],
            'location' => ['required'],
            'submitted_date' => ['required', 'date'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
