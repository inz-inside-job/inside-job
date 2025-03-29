<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ReviewCompanyData extends Data
{
    public function __construct(public int $id,
        public string $name,
    ) {}
}
