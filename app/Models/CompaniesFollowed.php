<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompaniesFollowed extends Model
{
    use HasFactory;

    protected $table = 'companies_followed';

    protected $fillable = [
        'user_id',
        'company_id',
        'followed_date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    protected function casts(): array
    {
        return [
            'followed_date' => 'timestamp',
        ];
    }
}
