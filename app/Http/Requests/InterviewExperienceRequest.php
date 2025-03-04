<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InterviewExperienceRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users'],
            'company_id' => ['required', 'exists:companies'],
            'job_title' => ['required'],
            'difficulty_level' => ['required'],
            'interview_questions' => ['required'],
            'overall_experience' => ['required'],
            'submitted_date' => ['required', 'date'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
