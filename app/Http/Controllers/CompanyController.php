<?php

namespace App\Http\Controllers;

use App\Data\Companies\CompanyData;
use App\Data\Company\CompanyData as CompanyPageData;
use App\Http\Requests\Company\StoreCompanyReviewRequest;
use App\Http\Requests\Company\StoreCompanySubmissionRequest;
use App\Http\Requests\CompanyIndexRequest;
use App\Models\Company;
use App\Models\CompanyClaimSubmission;
use App\Models\CompanySubmission;
use App\Models\Review;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class CompanyController extends Controller
{
    public function index(CompanyIndexRequest $request)
    {
        $params = $request->validated();

        $query = $this->getQuery($params);

        $companies = $this->buildQuery($query);

        /** @phpstan-ignore-next-line */
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
            ->withRecommend()
            ->withApproveOfCeo()
            ->withFollowed()
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

    public function follow(Request $request, Company $company)
    {
        if ($company->followers()->where('user_id', $request->user()->id)->exists()) {
            return redirect()
                ->back()
                ->withErrors('You are already following this company.');
        }

        $company->followers()->attach($request->user()->id);

        return back();
    }

    public function unfollow(Request $request, Company $company)
    {
        if (! $company->followers()->where('user_id', $request->user()->id)->exists()) {
            return redirect()
                ->back()
                ->withErrors('You are not following this company.');
        }

        $company->followers()->detach($request->user()->id);

        return back();
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

    public function storeReview(StoreCompanyReviewRequest $request, Company $company)
    {
        $review = Review::where('company_id', $company->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($review) {
            return redirect()
                ->back()
                ->withErrors('You have already submitted a review for this company.');
        }

        $this->createReview($company, $request);

        return redirect()
            ->back()
            ->with('success', 'Review submitted successfully.');
    }

    public function submit(StoreCompanySubmissionRequest $request)
    {
        CompanySubmission::create([
            'user_id' => auth()->id(),
            'name' => $request->input('name'),
            'industry' => $request->input('industry'),
            'description' => $request->input('description'),
            'employee_count' => $request->input('employee_count'),
            'founded_year' => $request->input('founded_year'),
            'ceo' => $request->input('ceo'),
            'type' => $request->input('type'),
        ]);

        return redirect()
            ->route('companies')
            ->with('success', 'Company submission received successfully.');
    }

    /**
     * @return Company|Builder|\Illuminate\Support\HigherOrderWhenProxy|mixed
     */
    public function getQuery(mixed $params): mixed
    {
        $query = Company::withRating()
            ->withAverageSalary()
            ->withRecommend()
            ->withCount('reviews')
            ->when(! empty($params['query']), function (Builder $query) use ($params) {
                $searchResults = Company::search($params['query'])->raw();
                $ids = collect($searchResults['hits'])->pluck('id');

                $query->whereIn('companies.id', $ids);
            });

        return $query;
    }

    public function buildQuery(mixed $query): CursorPaginator
    {
        return QueryBuilder::for($query)
            ->defaultSort(['-rating'])
            ->allowedSorts([
                AllowedSort::field('rating'),
                AllowedSort::field('reviews', 'reviews_count'),
                AllowedSort::field('recommend'),
            ])
            ->allowedFilters([
                AllowedFilter::exact('industry'),
                AllowedFilter::partial('location'),
                AllowedFilter::callback('company_sizes', $this->getCompanySizesFilter(), arrayValueDelimiter: ';'),
                AllowedFilter::callback('min_rating', function (Builder $query, $value) {
                    $query->having('rating', '>=', $value);
                })->default(3.5),
            ])
            // Second sort
            ->orderByDesc('id')
            ->cursorPaginate(10)
            ->withQueryString();
    }

    public function getCompanySizesFilter(): \Closure
    {
        return function (Builder $query, $sizes) {
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
        };
    }

    public function createReview(Company $company, StoreCompanyReviewRequest $request): void
    {
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
    }
}
