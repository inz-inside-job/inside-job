<?php

namespace App\Http\Middleware;

use App\Enums\CompanyUserPermission;
use App\Enums\UserRole;
use App\Models\CompanyUser;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $admin = $request->user()?->hasRole(UserRole::ADMIN) ?? false;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'status' => $request->session()->get('status'),
                'user' => $request->user(),
                'isAdmin' => $admin,
                'canViewDashboard' => $request->user() && (
                    (
                        CompanyUser::where('user_id', $request->user()->id)->get()->contains(function (CompanyUser $companyUser) {
                            return $companyUser->hasPermissionTo(CompanyUserPermission::VIEW_COMPANY_DETAILS);
                        })
                        || $admin
                    )
                ),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
