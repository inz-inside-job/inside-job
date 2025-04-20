<?php

namespace App\Policies;

use App\Enums\CompanyUserPermission;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\Job;
use App\Models\User;

class JobPolicy
{
    private function getCompanyUser(User $user, Job $job): CompanyUser
    {
        return CompanyUser::query()
            ->where('user_id', '=', $user->id)
            ->where('company_id', $job->company_id)
            ->firstOrFail();
    }

    public function index(User $user, Company $company): bool
    {
        return CompanyUser::query()
            ->where('user_id', '=', $user->id)
            ->where('company_id', $company->id)
            ->firstOrFail()
            ->hasPermissionTo(CompanyUserPermission::VIEW_JOB);
    }

    public function create(User $user, Company $company): bool
    {
        return CompanyUser::query()
            ->where('user_id', '=', $user->id)
            ->where('company_id', $company->id)
            ->firstOrFail()
            ->hasPermissionTo(CompanyUserPermission::CREATE_JOB);
    }

    public function edit(User $user, Job $job): bool
    {
        $companyUser = $this->getCompanyUser($user, $job);

        return $companyUser->hasPermissionTo(CompanyUserPermission::EDIT_COMPANY_DETAILS);
    }

    public function delete(User $user, Job $job): bool
    {
        $companyUser = $this->getCompanyUser($user, $job);

        return $companyUser->hasPermissionTo(CompanyUserPermission::DELETE_COMPANY);
    }
}
