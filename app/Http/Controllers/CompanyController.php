<?php

namespace App\Http\Controllers;

use App\Data\Companies\CompanyData;
use App\Data\Company\CompanyData as CompanyPageData;
use App\Http\Requests\Company\StoreCompanyReviewRequest;
use App\Models\Company;
use App\Models\Review;
use Illuminate\Database\Eloquent\Builder;
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
                ->withApproveOfCeo()
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
            ->withApproveOfCeo()
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

    public function storeReview(StoreCompanyReviewRequest $request, Company $company)
    {
        $review = Review::where('company_id', $company->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($review) {
            return redirect()
                ->route('companies.show', ['slug' => $company->slug])
                ->with('error', 'You have already submitted a review for this company.');
        }

        Review::create([
            'user_id' => auth()->id(),
            'company_id' => $company->id,
            'rating' => $request->input('rating'),
            'review' => $request->input('review'),
            'pros' => $request->input('pros'),
            'cons' => $request->input('cons'),
            'position' => $request->input('position'),
            'work_life_balance' => $request->input('work_life_balance'),
            'culture_values' => $request->input('culture_values'),
            'career_opportunities' => $request->input('career_opportunities'),
            'compensation_benefits' => $request->input('compensation_benefits'),
            'senior_management' => $request->input('senior_management'),
            'recommend' => $request->input('recommend'),
            'approve_of_ceo' => $request->input('approve_of_ceo'),
            'submitted_date' => now(),
        ]);

        return redirect()
            ->route('companies.show', ['slug' => $company->slug])
            ->with('success', 'Review submitted successfully.');
    }
}
