<?php

namespace App\Enums;

enum CompanyUserPermission: string
{
    case VIEW_COMPANY_DETAILS = 'view company details';
    case EDIT_COMPANY_DETAILS = 'edit company details';
    case DELETE_COMPANY = 'delete company';

    case VIEW_EMPLOYEE = 'view employee';
    case EDIT_EMPLOYEE = 'edit employee';
    case ADD_EMPLOYEE = 'add employee';
    case DELETE_EMPLOYEE = 'delete employee';

    case VIEW_JOB = 'view job';
    case EDIT_JOB = 'edit job';
    case CREATE_JOB = 'create job';
    case DELETE_JOB = 'delete job';

    case VIEW_JOB_APPLICATION = 'view job application';
    case ACCEPT_JOB_APPLICATION = 'accept job application';
    case DECLINE_JOB_APPLICATION = 'decline job application';
}
