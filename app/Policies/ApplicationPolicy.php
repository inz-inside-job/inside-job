<?php

namespace App\Policies;

use App\Enums\CompanyUserPermission;
use App\Models\Application;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\User;

class ApplicationPolicy
{
    // @codeCoverageIgnoreStart

    private function getCompanyUser(User $user, Application $application): CompanyUser
    {
        return CompanyUser::query()
            ->where('user_id', '=', $user->id)
            ->where('company_id', $application->job->company_id)
            ->firstOrFail();
    }

    public function index(User $user, Company $company): bool
    {
        return CompanyUser::query()
            ->where('user_id', '=', $user->id)
            ->where('company_id', $company->id)
            ->firstOrFail()
            ->hasPermissionTo(CompanyUserPermission::VIEW_JOB_APPLICATION);
    }

    public function acceptOrDeny(User $user, Application $application, string $action): bool
    {
        $companyUser = $this->getCompanyUser($user, $application);

        if ($action === 'accept') {
            return $companyUser->hasPermissionTo(CompanyUserPermission::ACCEPT_JOB_APPLICATION);
        }

        return $companyUser->hasPermissionTo(CompanyUserPermission::DECLINE_JOB_APPLICATION);
    }

    // @codeCoverageIgnoreEnd
}
