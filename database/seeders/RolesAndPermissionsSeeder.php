<?php

namespace Database\Seeders;

use App\Enums\CompanyUserPermission;
use App\Enums\CompanyUserRole;
use App\Enums\UserPermission;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    protected function clearCached(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }

    public function run(): void
    {
        $this->clearCached();

        // Create User Permissions
        foreach (UserPermission::cases() as $permission) {
            Permission::firstOrCreate(['name' => $permission->value]);
        }

        // Create Company User Permissions
        /* @var string[] $companyUserPermissions */
        $companyUserPermissions = [];
        foreach (CompanyUserPermission::cases() as $permission) {
            Permission::firstOrCreate(['name' => $permission->value]);
            $companyUserPermissions[] = $permission->value;
        }

        $this->clearCached();

        // Create User Roles
        /* @var Role[] $userRoles */
        $userRoles = [];
        foreach (UserRole::cases() as $role) {
            $userRoles[$role->value] = Role::firstOrCreate(['name' => $role->value]);
        }

        // Assign User Permissions to User Roles
        // Nothing

        // Create Company User Roles
        /* @var Role[] $companyUserRoles */
        $companyUserRoles = [];
        foreach (CompanyUserRole::cases() as $role) {
            $companyUserRoles[$role->value] = Role::firstOrCreate(['name' => $role->value]);
        }

        // Assign Company User Permissions to Company User Roles
        $companyUserRoles[CompanyUserRole::OWNER->value]->syncPermissions($companyUserPermissions);

        $companyUserRoles[CompanyUserRole::HR->value]->syncPermissions([
            CompanyUserPermission::VIEW_COMPANY_DETAILS,
            CompanyUserPermission::VIEW_EMPLOYEE,
            CompanyUserPermission::VIEW_JOB,
            CompanyUserPermission::VIEW_JOB_APPLICATION,

            CompanyUserPermission::EDIT_EMPLOYEE,
            CompanyUserPermission::EDIT_JOB,

            CompanyUserPermission::ADD_EMPLOYEE,
            CompanyUserPermission::CREATE_JOB,

            CompanyUserPermission::DELETE_EMPLOYEE,
            CompanyUserPermission::DELETE_JOB,

            CompanyUserPermission::ACCEPT_JOB_APPLICATION,
            CompanyUserPermission::DECLINE_JOB_APPLICATION,
        ]);

        $companyUserRoles[CompanyUserRole::EMPLOYEE->value]->syncPermissions([
            CompanyUserPermission::VIEW_COMPANY_DETAILS,
            CompanyUserPermission::VIEW_EMPLOYEE,
            CompanyUserPermission::VIEW_JOB,
        ]);

        $this->clearCached();
    }
}
