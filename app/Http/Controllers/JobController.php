<?php

namespace App\Http\Controllers;

use App\Data\JobData;
use App\Models\Job;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Inertia\Inertia;
use Spatie\LaravelData\CursorPaginatedDataCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class JobController
{
    public function index()
    {
        $jobs = QueryBuilder::for(
            Job::with(['company' => function (BelongsTo $query) {
                $query->withRating()->withCount('reviews');
            }])
        )
            ->allowedSorts(
                AllowedSort::field('posted_date'),
                AllowedSort::callback('relevance', function ($query, $direction) {
                    // xDD
                    $query->orderBy('posted_date', $direction);
                }),
                AllowedSort::callback('salary', function ($query, $direction) {
                    $query->orderBy('salary_min', $direction);
                }),
            )
//            ->defaultSort('-relevance')
            ->allowedFilters(
                AllowedFilter::exact('employment_type'),
                AllowedFilter::exact('employment_experience'),
                AllowedFilter::partial('location'),
                AllowedFilter::callback('salary', function ($query, $value) {
                    $query->where('salary_min', '>=', $value);
                }),
                AllowedFilter::callback('posted_before', function ($query, $value) {
                    $query->where('posted_date', '<=', $value);
                }),
                AllowedFilter::exact('company.industry')
            )
            ->cursorPaginate(10)
            ->withQueryString();

        $data = JobData::collect($jobs, CursorPaginatedDataCollection::class)->wrap('data');

        return Inertia::render('jobs', [
            'jobs' => Inertia::merge($data),
        ]);
    }

    public function store(JobRequest $request)
    {
        return Job::create($request->validated());
    }

    public function show(Job $job)
    {
        return $job;
    }

    public function update(JobRequest $request, Job $job)
    {
        $job->update($request->validated());

        return $job;
    }

    public function destroy(Job $job)
    {
        $job->delete();

        return response()->json();
    }
}
