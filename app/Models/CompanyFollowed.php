<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @mixin IdeHelperCompanyFollowed
 */
class CompanyFollowed extends Pivot
{
    public $incrementing = true;

    public $table = 'companies_followed';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'company_id',
        'followed_date',
    ];

    protected $casts = [
        'followed_date' => 'datetime',
    ];
}
