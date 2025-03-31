declare namespace App.Data {
export type CompanyData = {
logo: string | null;
id: number;
slug: string;
name: string;
industry: string;
location: string | null;
employee_count: number;
founded_year: string;
rating: number;
average_salary: number;
recommend: number;
reviews_count: number;
description: string;
};
export type CompanySubmissionCountsData = {
pending: number;
approved: number;
rejected: number;
total: number;
};
export type CompanySubmissionData = {
name: string;
industry: string;
description: string;
employee_count: number;
founded_year: string;
status: string;
created_at: string;
id: number;
user: App.Data.CompanySubmissionUserData;
};
export type CompanySubmissionUserData = {
name: string;
};
}
declare namespace App.Data.Jobs {
export type JobCompanyData = {
logo: string | null;
name: string;
slug: string;
rating: number;
reviews_count: number;
};
export type JobData = {
company: App.Data.Jobs.JobCompanyData;
id: number;
company_id: number;
slug: string;
title: string;
location: string;
employment_type: App.Enums.EmploymentType;
employment_experience: App.Enums.EmploymentExperience;
posted_date: string;
salary_min: number;
salary_max: number;
description: string;
requirements: Array<string>;
};
}
declare namespace App.Enums {
export type ApplicationStatus = 'Applied' | 'Invited' | 'Rejected';
export type CompanySubmissionStatus = 'pending' | 'approved' | 'rejected';
export type CompanyUserPermission = 'view company details' | 'edit company details' | 'delete company' | 'view employee' | 'edit employee' | 'add employee' | 'delete employee' | 'view job' | 'edit job' | 'create job' | 'delete job' | 'view job application' | 'accept job application' | 'decline job application';
export type UserPermission = {
name: string;
value: string;
};
export type CompanyUserRole = 'owner' | 'hr' | 'employee';
export type EmploymentExperience = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Manager' | 'Director' | 'Executive';
export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Temporary' | 'Remote';
export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard';
export type InterviewExperience = 'Positive' | 'Negative' | 'Neutral';
export type UserRole = 'admin';
}
