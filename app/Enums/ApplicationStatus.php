<?php

namespace App\Enums;

enum ApplicationStatus: string {
    case APPLIED = 'Applied';
    case INVITED = 'Invited';
    case REJECTED = 'Rejected';
}
