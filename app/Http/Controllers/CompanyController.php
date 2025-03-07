<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;

class CompanyController
{
    public function index()
    {
        return Company::all();
    }

    public function store(CompanyRequest $request)
    {
        return Company::create($request->validated());
    }

    public function show(Company $company)
    {
        return $company;
    }

    public function update(CompanyRequest $request, Company $company)
    {
        $company->update($request->validated());

        return $company;
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return response()->json();
    }
}
