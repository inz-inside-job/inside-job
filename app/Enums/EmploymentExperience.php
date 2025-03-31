<?php

namespace App\Enums;

enum EmploymentExperience: string
{
    case ENTRY_LEVEL = 'Entry Level';
    case MID_LEVEL = 'Mid Level';
    case SENIOR_LEVEL = 'Senior Level';
    case MANAGER = 'Manager';
    case DIRECTOR = 'Director';
    case EXECUTIVE = 'Executive';
}
