<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $company_id
 * @property string $job_title
 * @property string $salary_amount
 * @property string $location
 * @property int $submitted_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereJobTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereSalaryAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereSubmittedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Salary whereUserId($value)
 * @mixin \Eloquent
 */
class Salary extends Pivot
{
    public $incrementing = true;

    public $table = 'salaries';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'job_id',
        'job_title',
        'salary_amount',
        'location',
        'submitted_date',
    ];

    protected $casts = [
        'submitted_date' => 'timestamp',
    ];
}
