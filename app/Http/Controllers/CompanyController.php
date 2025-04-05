<?php

namespace App\Http\Controllers;

use App\Data\Companies\CompanyData;
use App\Data\Company\CompanyData as CompanyPageData;
use App\Models\Company;
use App\Models\CompanyClaimSubmission;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = QueryBuilder::for(
            Company::withRating()
                ->withAverageSalary()
                ->withRecommended()
                ->withCount('reviews')
        )
            ->defaultSort(['-rating'])
            ->allowedSorts([
                AllowedSort::field('rating'),
                AllowedSort::field('reviews', 'reviews_count'),
                AllowedSort::field('recommend'),
            ])
            ->allowedFilters([
                AllowedFilter::exact('industry'),
                AllowedFilter::partial('location'),
                AllowedFilter::callback('company_sizes', function (Builder $query, $sizes) {
                    $query->where(function ($query) use ($sizes) {
                        foreach ($sizes as $size) {
                            $range = explode(',', $size);
                            $min = $range[0] !== 'null' ? $range[0] : null;
                            $max = $range[1] !== 'null' ? $range[1] : null;

                            $query->orWhere(function ($query) use ($min, $max) {
                                if ($min) {
                                    $query->where('employee_count', '>=', $min);
                                }
                                if ($max) {
                                    $query->where('employee_count', '<=', $max);
                                }
                            });
                        }
                    });
                }, arrayValueDelimiter: ';'),
                AllowedFilter::callback('min_rating', function (Builder $query, $value) {
                    $query->having('rating', '>=', $value);
                })->default(3.5),
            ])
            // Second sort
            ->orderByDesc('id')
            ->cursorPaginate(10)
            ->withQueryString();

        $paginatedResponse = $companies->toArray();

        $data = CompanyData::collect($paginatedResponse['data']);

        return Inertia::render('companies', [
            'next_cursor' => $paginatedResponse['next_cursor'],
            'companies' => Inertia::merge($data),
        ]);
    }

    public function show(string $slug)
    {
        $company = Company::whereSlug($slug)
            ->withRating()
            ->withAverageSalary()
            ->withRecommended()
            ->withCount('reviews')
            ->withCount('jobs')
            ->with([
                'reviews' => function ($query) {
                    $query->with('user');
                },
            ])
            ->firstOrFail();

        return Inertia::render('company', [
            'company' => CompanyPageData::from($company),
        ]);
    }

    public function submitClaim(Request $request, Company $company)
    {
        $request->validate([
            'job_title' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'verification_details' => 'required|string|max:1000',
        ]);

        CompanyClaimSubmission::create([
            'job_title' => $request->input('job_title'),
            'email' => $request->input('email'),
            'verification_details' => $request->input('verification_details'),
            'company_id' => $company->id,
            'user_id' => $request->user()->id,
        ]);
    }
}
