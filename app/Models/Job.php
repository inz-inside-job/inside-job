<?php

namespace App\Models;

use App\Enums\EmploymentType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Job extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'company_id',
        'title',
        'location',
        'employment_type',
        'posted_date',
        'salary_range',
        'description',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function applications(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'applications', 'job_id', 'user_id')
            ->as('applications')
            ->withTimestamps()
            ->withPivot('id', 'status', 'applied_date')
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
