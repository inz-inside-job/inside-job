<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyIndexRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'industry' => 'sometimes|string',
            'location' => 'sometimes|string',
            'company_sizes' => ['sometimes', 'array'],
            'company_sizes.*' => ['numeric'],
            'min_rating' => 'sometimes|numeric|between:0,5',
            'sort' => 'sometimes|string',
            'cursor' => 'sometimes|string',
            'query' => 'sometimes|string',
        ];
    }
}
