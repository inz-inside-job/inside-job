<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserCompany extends Pivot
{
    public $incrementing = true;

    public $table = 'user_company';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'company_id',
    ];
}
