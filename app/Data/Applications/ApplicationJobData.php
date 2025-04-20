<?php

namespace App\Data\Applications;

use Spatie\LaravelData\Data;

class ApplicationJobData extends Data
{
    public function __construct(
        public string $title,
    ) {}
}
