<?php

namespace App\Models;

use App\Enums\EmploymentType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'title',
        'location',
        'employment_type',
        'posted_date',
        'salary_range',
        'description',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function applications(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'applications', 'job_id', 'user_id')
            ->as('applications')
            ->withTimestamps()
            ->withPivot('status', 'applied_date')
            ->using(Application::class);
    }

    protected function casts(): array
    {
        return [
            'posted_date' => 'timestamp',
            'employment_type' => EmploymentType::class,
        ];
    }
}
