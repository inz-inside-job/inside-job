<?php

namespace App\Http\Controllers\Dashboard;

use App\Data\Company\CompanyDashboardData;
use App\Data\Company\CompanyEditData;
use App\Enums\UserRole;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Models\Company;
use Gate;
use Inertia\Inertia;

class CompanyDashboardController
{
    public function dashboard()
    {
        Gate::authorize('index', Company::class);

        $companies = Company::query()
            ->with('users');

        if (auth()->user()->hasRole(UserRole::ADMIN)) {
            $companies = $companies->get();
        } else {
            $companies = $companies->whereHas('users', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })->get();
        }

        return Inertia::render('dashboard/company-dashboard', [
            'companies' => CompanyDashboardData::collect($companies)->toArray(),
        ]);
    }

    public function edit(string $slug)
    {
        $company = Company::whereSlug($slug)->firstOrFail();

        Gate::authorize('view', $company);

        return Inertia::render('dashboard/company-edit', [
            'company' => CompanyEditData::from($company),
        ]);
    }

    public function update(UpdateCompanyRequest $request, Company $company)
    {
        Gate::authorize('update', $company);

        $validated = $request->validated();

        if ($request->file('logo') != null) {
            $logoPath = $request->file('logo')->store('logos', 'public');

            if (! $logoPath) {
                return redirect()->back()
                    ->withErrors('Logo upload failed.');
            }

            $company->update([
                'logo' => $logoPath,
            ]);
        }

        if ($request->file('header') != null) {
            $headerPath = $request->file('header')->store('headers', 'public');

            if (! $headerPath) {
                return redirect()->back()
                    ->withErrors('Header upload failed.');
            }

            $company->update([
                'header' => $headerPath,
            ]);
        }

        $company->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'website' => $validated['website'],
            'industry' => $validated['industry'],
            'location' => $validated['location'],
            'mission' => $validated['mission'],
            'employee_count' => $validated['employee_count'],
            'type' => $validated['type'],
            'ceo' => $validated['ceo'],
            'benefits' => $validated['benefits'],
        ]);

        return redirect()->route('dashboard.view', ['slug' => $company->slug])
            ->with('success', 'Company updated successfully.');
    }
}
