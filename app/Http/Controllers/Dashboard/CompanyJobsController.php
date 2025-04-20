<?php

namespace App\Http\Controllers\Dashboard;

use App\Data\Jobs\JobCompanyData;
use App\Data\Jobs\JobData;
use App\Data\Jobs\JobFormData;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CompanyJobsController extends Controller
{
    public function index(Company $company)
    {
        $company = Company::where('slug', $company->slug)->withCount('reviews')->firstOrFail();

        Gate::authorize('index', [Job::class, $company]);

        $jobs = $company->jobs()
            ->withCount('applications')
            ->with([
                'company' => function (BelongsTo $query) {
                    $query->withCount('reviews');
                },
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/jobs/company-jobs', [
            'company' => JobCompanyData::from($company),
            'jobs' => JobData::collect($jobs),
        ]);
    }

    public function create(Company $company)
    {
        $company = Company::where('slug', $company->slug)->withCount('reviews')->firstOrFail();

        Gate::authorize('create', [Job::class, $company]);

        return Inertia::render('dashboard/jobs/company-job-form', [
            'company' => JobCompanyData::from($company),
            'job' => null,
        ]);
    }

    public function edit(Company $company, Job $job)
    {
        Gate::authorize('edit', $job);

        $company = Company::where('slug', $company->slug)->withCount('reviews')->firstOrFail();
        $job = Job::where('id', $job->id)->with([
            'company' => function (BelongsTo $query) {
                $query->withCount('reviews');
            },
        ])->withCount('applications')->firstOrFail();

        Gate::authorize('index', [Job::class, $company]);

        return Inertia::render('dashboard/jobs/company-job-form', [
            'company' => JobCompanyData::from($company),
            'job' => JobData::from($job),
        ]);
    }

    public function store(Company $company, JobFormData $data)
    {
        Gate::authorize('create', [Job::class, $company]);

        $job = $company->jobs()->create([...$data->all(), 'posted_date' => now()]);

        return redirect()->route('dashboard.jobs.edit', ['company' => $company, 'job' => $job])
            ->with('success', 'Job created successfully.');
    }

    public function update(Company $company, Job $job, JobFormData $data)
    {
        Gate::authorize('edit', $job);

        $job->update($data->all());

        return redirect()->route('dashboard.jobs.edit', ['company' => $company, 'job' => $job])
            ->with('success', 'Job updated successfully.');
    }

    public function destroy(Company $company, Job $job)
    {
        Gate::authorize('delete', $job);
        $job->delete();

        return redirect()->route('dashboard.jobs', ['company' => $company])
            ->with('success', 'Job deleted successfully.');
    }
}
