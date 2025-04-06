<?php

namespace App\Http\Controllers\Admin;

use App\Data\CompanySubmission\CompanyClaimSubmissionData;
use App\Data\CompanySubmission\CompanySubmissionData;
use App\Enums\CompanyUserRole;
use App\Models\Company;
use App\Models\CompanyClaimSubmission;
use App\Models\CompanySubmission;
use App\Models\CompanyUser;
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

        return Inertia::render(
            'admin/dashboard',
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

    public function updateSubmission(Request $request, CompanySubmission $submission)
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

    public function claims()
    {
        $submissions = QueryBuilder::for(
            CompanyClaimSubmission::query()->with('user')->with('company')
        )
            ->defaultSort('-email')
            ->allowedSorts([
                AllowedSort::field('email'),
                AllowedSort::field('created_at'),
                AllowedSort::field('job_title'),
            ])
            ->cursorPaginate(20)
            ->withQueryString();

        $paginated = $submissions->toArray();

        $data = CompanyClaimSubmissionData::collect($paginated['data']);

        return Inertia::render(
            'admin/claims',
            [
                'claims' => Inertia::merge($data),
                'next_cursor' => $paginated['next_cursor'],
            ]
        );
    }

    public function viewClaim(Request $request, CompanyClaimSubmission $claim)
    {
        $claim->load('user', 'company');

        $data = CompanyClaimSubmissionData::from($claim);

        return Inertia::render('admin/claim', [
            'claim' => $data,
        ]);
    }

    public function updateClaim(Request $request, CompanyClaimSubmission $claim)
    {
        $action = $request->post('action');

        if ($action === 'approve') {
            $claim->update(['status' => 'approved']);
            $claim->company()->update([
                'claimed' => true,
            ]);

            // Reject all other claims for the same company
            CompanyClaimSubmission::where('company_id', $claim->company_id)
                ->where('id', '!=', $claim->id)
                ->update(['status' => 'rejected']);

            /**
             * @var CompanyUser $companyUser
             */
            $companyUser = CompanyUser::create([
                'user_id' => $claim->user_id,
                'company_id' => $claim->company_id,
            ]);

            $companyUser->syncRoles([CompanyUserRole::OWNER]);
        } elseif ($action === 'reject') {
            $claim->update(['status' => 'rejected']);
        }

        return redirect()->route('admin.claim', $claim);
    }
}
