<?php

namespace App\Http\Controllers;

use App\Data\CompanyData;
use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Spatie\LaravelData\CursorPaginatedDataCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class CompanyController
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
                'location',
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
            ->cursorPaginate(10)
            ->withQueryString();

        $data = CompanyData::collect($companies, CursorPaginatedDataCollection::class)->wrap('data');

        return Inertia::render('companies', [
            'companies' => Inertia::merge($data),
        ]);
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
