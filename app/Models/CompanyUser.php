<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Spatie\Permission\Traits\HasRoles;

/**
 * @mixin IdeHelperCompanyUser
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
