<?php

namespace App\Http\Requests\Job;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobApplicationRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|min:1|max:255',
            'last_name' => 'required|string|min:1|max:255',
            'phone' => 'required|string|min:1|max:32',
            'linkedin' => 'string|nullable|max:32',
            'portfolio' => 'string|nullable|max:64',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048', // 2MB max
            'cover_letter' => 'nullable|string|max:5000',
        ];
    }
}
