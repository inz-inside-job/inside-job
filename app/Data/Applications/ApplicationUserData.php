<?php

namespace App\Data\Applications;

use Spatie\LaravelData\Data;

class ApplicationUserData extends Data
{
    public function __construct(
        public string $email,
    ) {}
}
