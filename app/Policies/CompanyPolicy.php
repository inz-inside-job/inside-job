<?php

namespace App\Policies;

use App\Enums\CompanyUserPermission;
use App\Enums\CompanyUserRole;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\User;

class CompanyPolicy
{
    // @codeCoverageIgnoreStart

    private function getCompanyUser(User $user, Company $company): CompanyUser
    {
        return CompanyUser::query()
            ->where('user_id', '=', $user->id)
            ->where('company_id', $company->id)
            ->firstOrFail();
    }

    public function index(User $user): bool
    {
        return CompanyUser::query()
            ->where('user_id', '=', $user->id)
            ->get()
            ->contains(function (CompanyUser $companyUser) {
                return $companyUser->hasRole([CompanyUserRole::HR, CompanyUserRole::OWNER]);
            });
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Company $company): bool
    {
        $companyUser = $this->getCompanyUser($user, $company);

        return $companyUser->hasPermissionTo(CompanyUserPermission::VIEW_COMPANY_DETAILS);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Company $company): bool
    {
        $companyUser = $this->getCompanyUser($user, $company);

        return $companyUser->hasPermissionTo(CompanyUserPermission::EDIT_COMPANY_DETAILS);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Company $company): bool
    {
        $companyUser = $this->getCompanyUser($user, $company);

        return $companyUser->hasPermissionTo(CompanyUserPermission::DELETE_COMPANY);
    }

    // @codeCoverageIgnoreEnd
}
