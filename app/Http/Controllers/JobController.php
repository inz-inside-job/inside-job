<?php

namespace App\Http\Controllers;

use App\Data\Jobs\JobData;
use App\Http\Requests\JobIndexRequest;
use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class JobController extends Controller
{
    public function index(JobIndexRequest $request)
    {
        $params = $request->validated();

        $query = Job::with([
            'company' => fn (BelongsTo $query) => $query->withRating()->withCount('reviews'),
        ])->when(! empty($params['query']), function (Builder $query) use ($params) {
            $searchResults = Job::search($params['query'])->raw();
            $ids = collect($searchResults['hits'])->pluck('id');

            $query->whereIn('jobs.id', $ids);
        });

        $jobs = QueryBuilder::for($query)
            ->allowedSorts(
                [
                    AllowedSort::field('posted_date'),
                    AllowedSort::callback('relevance', function ($query, $decending) {
                        // sort by posted_date idk how else to do it
                        $query->orderBy('posted_date', $decending ? 'desc' : 'asc');
                    }),
                    AllowedSort::callback('salary', function ($query, $decending) {
                        $query->orderBy('salary_min', $decending ? 'desc' : 'asc');
                    }),
                ]
            )
            ->defaultSort('-posted_date')
            ->allowedFilters(
                [
                    AllowedFilter::exact('employment_type'),
                    AllowedFilter::exact('employment_experience'),
                    AllowedFilter::partial('location'),
                    AllowedFilter::callback('salary', function ($query, $value) {
                        $query->where('salary_min', '>=', $value);
                    })->default(50000),
                    AllowedFilter::callback('posted_in', function (Builder $query, $value) {
                        try {
                            $date = Carbon::parse($value);
                        } catch (\Exception $e) {
                            return;
                        }
                        $query->where('posted_date', '>=', $date);
                    }),
                    AllowedFilter::exact('company.industry'),
                ]
            )
            ->orderByDesc('id')
            ->cursorPaginate(10)
            ->withQueryString();

        $paginatedResponse = $jobs->toArray();

        $data = JobData::collect($paginatedResponse['data']);

        return Inertia::render('jobs', [
            'jobs' => Inertia::merge($data),
            'next_cursor' => $paginatedResponse['next_cursor'],
        ]);
    }

    public function show(Job $job)
    {
        return $job;
    }

    public function apply(string $slug)
    {
        $job = Job::whereSlug($slug)->with([
            'company' => function (BelongsTo $query) {
                $query->withRating()->withCount('reviews');
            }])->firstOrFail();

        return Inertia::render('apply', [
            'job' => JobData::from($job),
        ]);
    }
}
