<?php

namespace App\Http\Controllers\Admin;

use App\Data\CompanySubmissionData;
use App\Models\CompanySubmission;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class AdminDashboardController
{
    public function index()
    {
        $submissions = QueryBuilder::for(
            CompanySubmission::with('user')
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
            ");

        $paginated = $submissions->toArray();

        $data = CompanySubmissionData::collect($paginated['data']);

        return Inertia::render('admin/dashboard',
            [
                'submissions' => Inertia::merge($data),
                'next_cursor' => $paginated['next_cursor'],
                'aggregates' => $aggregates
            ]
        );
    }
}
