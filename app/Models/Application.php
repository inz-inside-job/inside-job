<?php

namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;

    class Application extends Model {
        use HasFactory;

        protected $fillable = [
            'user_id',
            'job_id',
            'status',
            'applied_date',
        ];

        public function user(): BelongsTo
        {
            return $this->belongsTo(User::class);
        }

        public function job(): BelongsTo
        {
            return $this->belongsTo(Job::class);
        }

        protected function casts(): array
        {
            return [
                'applied_date' => 'timestamp',
            ];
        }
    }
