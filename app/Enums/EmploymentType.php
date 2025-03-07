<?php

namespace App\Enums;

enum EmploymentType: string {
    case FULL_TIME = 'Full Time';
    case PART_TIME = 'Part Time';
    case CONTRACT = 'Contract';
    case INTERNSHIP = 'Internship';
    case TEMPORARY = 'Temporary';
    case REMOTE = 'Remote';
}
