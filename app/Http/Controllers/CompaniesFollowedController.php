<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompaniesFollowedRequest;
use App\Models\CompaniesFollowed;

class CompaniesFollowedController extends Controller
{
    public function index()
    {
        return CompaniesFollowed::all();
    }

    public function store(CompaniesFollowedRequest $request)
    {
        return CompaniesFollowed::create($request->validated());
    }

    public function show(CompaniesFollowed $companiesFollowed)
    {
        return $companiesFollowed;
    }

    public function update(CompaniesFollowedRequest $request, CompaniesFollowed $companiesFollowed)
    {
        $companiesFollowed->update($request->validated());

        return $companiesFollowed;
    }

    public function destroy(CompaniesFollowed $companiesFollowed)
    {
        $companiesFollowed->delete();

        return response()->json();
    }
}
