<?php

namespace App\Enums;

enum CompanySubmissionStatus: string
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
}
