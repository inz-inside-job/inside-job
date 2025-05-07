<?php

namespace App\Http\Controllers;

use App\Data\Jobs\JobData;
use App\Enums\ApplicationStatus;
use App\Http\Requests\Job\StoreJobApplicationRequest;
use App\Http\Requests\JobIndexRequest;
use App\Models\Application;
use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class JobController extends Controller
{
    public function index(JobIndexRequest $request)
    {
        $params = $request->validated();

        $query = $this->getQuery($params);

        $jobs = $this->buildQuery($query);

        /** @phpstan-ignore-next-line */
        $paginatedResponse = $jobs->toArray();

        $data = JobData::collect($paginatedResponse['data']);

        return Inertia::render('jobs', [
            'jobs' => Inertia::merge($data),
            'next_cursor' => $paginatedResponse['next_cursor'],
        ]);
    }

    public function apply(string $slug)
    {
        $job = Job::whereSlug($slug)->with([
            'company' => function ($query) {
                $query->withRating()->withCount('reviews');
            },
        ])->withCount('applications')->firstOrFail();

        return Inertia::render('apply', [
            'job' => JobData::from($job),
        ]);
    }

    public function storeApplication(StoreJobApplicationRequest $request, Job $job)
    {
        $application = Application::where('job_id', $job->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($application) {
            return redirect()->back()->withErrors('You have already applied for this job.');
        }

        $resume_path = $request->file('resume')->storeAs('resumes', auth()->id().'_'.$request->file('resume')->getClientOriginalName(), 'local');

        if (! $resume_path) {
            return redirect()->back()->withErrors('Failed to upload resume.');
        }

        $this->createApplication($job, $request, $resume_path);

        return redirect()->route('jobs');

    }

    public function show(string $slug)
    {
        $job = Job::whereSlug($slug)->with([
            'company' => fn ($query) => $query->withRating()->withCount('reviews')->withApproveOfCeo(),
        ])->withCount('applications')->firstOrFail();

        $job->increment('visit_count');

        return Inertia::render('job', [
            'job' => JobData::from($job),
        ]);
    }

    public function getQuery(mixed $params): \Illuminate\Support\HigherOrderWhenProxy|Builder
    {
        $query = Job::with([
            'company' => fn ($query) => (
                $query->withRating()->withCount('reviews')->withApproveOfCeo()),
        ])
            ->withCount('applications')
            ->when(! empty($params['query']), function (Builder $query) use ($params) {
                $searchResults = Job::search($params['query'])->raw();
                $ids = collect($searchResults['hits'])->pluck('id');

                $query->whereIn('jobs.id', $ids);
            });

        return $query;
    }

    public function buildQuery(Builder|\Illuminate\Support\HigherOrderWhenProxy $query): \Illuminate\Contracts\Pagination\CursorPaginator
    {
        return QueryBuilder::for($query)
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
                $this->getFilters()
            )
            ->orderByDesc('id')
            ->cursorPaginate(10)
            ->withQueryString();
    }

    public function getFilters(): array
    {
        return [
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
        ];
    }

    public function createApplication(Job $job, StoreJobApplicationRequest $request, string $resume_path): void
    {
        Application::create([
            'job_id' => $job->id,
            'user_id' => auth()->id(),
            'status' => ApplicationStatus::APPLIED,
            'applied_date' => now(),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'phone' => $request->input('phone'),
            'linkedin' => $request->input('linkedin'),
            'portfolio' => $request->input('portfolio'),
            'resume' => $resume_path,
            'cover_letter' => $request->input('cover_letter'),
        ]);
    }
}
