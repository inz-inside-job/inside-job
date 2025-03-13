<?php

namespace App\Enums;

enum CompanyUserRole: string
{
    case OWNER = 'owner';
    case HR = 'hr';
    case EMPLOYEE = 'employee';
}
