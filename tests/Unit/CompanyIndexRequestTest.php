<?php

use App\Http\Requests\CompanyIndexRequest;

it('validates the company index request', function () {
    $request = new CompanyIndexRequest;

    $rules = $request->rules();

    expect($rules)->toMatchArray([
        'industry' => 'sometimes|string',
        'location' => 'sometimes|string',
        'company_sizes' => ['sometimes', 'array'],
        'company_sizes.*' => ['numeric'],
        'min_rating' => 'sometimes|numeric|between:0,5',
        'sort' => 'sometimes|string',
        'cursor' => 'sometimes|string',
        'query' => 'sometimes|string',
    ]);
});
