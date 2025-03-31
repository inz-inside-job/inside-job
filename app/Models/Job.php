<?php

namespace App\Models;

use App\Enums\EmploymentExperience;
use App\Enums\EmploymentType;
use Database\Factories\JobFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

/**
 * @mixin IdeHelperJob
 */
class Job extends Model
{
    /** @use HasFactory<JobFactory> */
    use HasFactory, HasSlug;

    protected $fillable = [
        'company_id',
        'title',
        'location',
        'employment_type',
        'employment_experience',
        'posted_date',
        'salary_min',
        'salary_max',
        'description',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->extraScope(function ($query) {
                $query->where('company_id', $this->company_id);
            });
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
            'posted_date' => 'datetime',
            'employment_type' => EmploymentType::class,
            'employment_experience' => EmploymentExperience::class,
            'salary_min' => 'int',
            'salary_max' => 'int',
            'requirements' => 'array',
        ];
    }
}
