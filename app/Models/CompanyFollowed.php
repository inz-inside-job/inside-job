<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int $id
 * @property int $user_id
 * @property int $company_id
 * @property int $followed_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed whereFollowedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CompanyFollowed whereUserId($value)
 *
 * @mixin \Eloquent
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
        'followed_date' => 'timestamp',
    ];
}
