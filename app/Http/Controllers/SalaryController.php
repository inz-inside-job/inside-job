<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalaryRequest;
use App\Models\Salary;

class SalaryController extends Controller
{
    public function index()
    {
        return Salary::all();
    }

    public function store(SalaryRequest $request)
    {
        return Salary::create($request->validated());
    }

    public function show(Salary $salary)
    {
        return $salary;
    }

    public function update(SalaryRequest $request, Salary $salary)
    {
        $salary->update($request->validated());

        return $salary;
    }

    public function destroy(Salary $salary)
    {
        $salary->delete();

        return response()->json();
    }
}
