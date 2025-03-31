<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $user_id
 * @property int $company_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyUser withoutRole($roles, $guard = null)
 *
 * @mixin \Eloquent
 */
class CompanyUser extends Pivot
{
    use HasRoles;

    public $incrementing = true;

    public $table = 'user_company';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'company_id',
    ];

    protected string $guard_name = 'web';
}
