<?php

use App\Http\Requests\GlobalSearchRequest;

it('validates the global search request', function () {
    $request = new GlobalSearchRequest;

    $rules = $request->rules();

    expect($rules)->toMatchArray([
        'query' => 'required|string|max:255',
    ]);
});
