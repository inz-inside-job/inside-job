<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class CompanySubmissionUserData extends Data
{
    public function __construct(
        public string $name,
    ) {}
}
