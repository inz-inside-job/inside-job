<?php

namespace App\Http\Controllers\Admin;

use App\Data\CompanySubmissionData;
use App\Models\Company;
use App\Models\CompanySubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class AdminDashboardController
{
    public function index()
    {
        $submissions = QueryBuilder::for(
            CompanySubmission::query()->with('user')
        )
            ->defaultSort('-name')
            ->allowedSorts([
                AllowedSort::field('name'),
                AllowedSort::field('industry'),
                AllowedSort::field('created_at'),
            ])
            ->cursorPaginate(20)
            ->withQueryString();

        $aggregates = CompanySubmission::query()
            ->selectRaw("
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
                COUNT(*) AS total
            ")
            ->first()
            ->toArray();

        $paginated = $submissions->toArray();

        $data = CompanySubmissionData::collect($paginated['data']);

        return Inertia::render('admin/dashboard',
            [
                'submissions' => Inertia::merge($data),
                'next_cursor' => $paginated['next_cursor'],
                'aggregates' => $aggregates,
            ]
        );
    }

    public function view(CompanySubmission $submission)
    {
        $submission->load('user');

        $data = CompanySubmissionData::from($submission);

        return Inertia::render('admin/submission', [
            'submission' => $data,
        ]);
    }

    public function update(Request $request, CompanySubmission $submission)
    {
        $action = $request->post('action');

        if ($action === 'approve') {
            $submission->update(['status' => 'approved']);
            Company::create([
                'name' => $submission->name,
                'industry' => $submission->industry,
                'description' => $submission->description,
                'employee_count' => $submission->employee_count,
                'founded_year' => $submission->founded_year,
                'ceo' => $submission->ceo,
                'type' => $submission->type,
            ]);

        } elseif ($action === 'reject') {
            $submission->update(['status' => 'rejected']);
        }

        return redirect()->route('admin.submission', $submission);
    }
}
