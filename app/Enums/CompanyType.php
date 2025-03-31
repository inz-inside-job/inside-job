<?php

namespace App\Enums;

enum CompanyType: string
{
    case PUBLIC = 'Public';
    case PRIVATE = 'Private';
    case NONPROFIT = 'Non-profit';
}
