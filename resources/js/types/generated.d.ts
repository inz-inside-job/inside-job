declare namespace App.Data {
export type CompanyData = {
logo: string | null;
founded_year: string;
header: string | null;
id: number;
name: string;
industry: string;
location: string | null;
employee_count: number;
rating: number;
average_salary: number;
recommend: number;
reviews_count: number;
description: string;
slug: string;
ceo: string;
mission: string | null;
benefits: Array<string>;
type: App.Enums.CompanyType;
};
export type CompanyPageData = {
logo: string | null;
founded_year: string;
header: string | null;
jobs: Array<App.Data.JobData>;
id: number;
name: string;
industry: string;
location: string | null;
employee_count: number;
rating: number;
average_salary: number;
recommend: number;
reviews_count: number;
description: string;
slug: string;
ceo: string;
mission: string | null;
benefits: Array<string>;
type: App.Enums.CompanyType;
jobs_count: number;
website: string;
};
export type JobData = {
id: number;
company_id: number;
title: string;
location: string;
employment_type: App.Enums.EmploymentType;
posted_date: string;
salary_range: string | null;
description: string;
slug: string;
};
export type ReviewCompanyData = {
id: number;
name: string;
};
export type ReviewData = {
user: App.Data.UserData;
company: App.Data.ReviewCompanyData;
id: number;
company_id: number;
user_id: number;
rating: number;
review: string;
pros: Array<string>;
cons: Array<string>;
position: string;
work_life_balance: number;
culture_values: number;
career_opportunities: number;
compensation_benefits: number;
senior_management: number;
recommend: boolean;
approve_of_ceo: boolean;
};
export type UserData = {
id: number;
name: string;
image: string;
};
}
declare namespace App.Enums {
export type UserPermission = {
name: string;
value: string;
};
export type ApplicationStatus = 'Applied' | 'Invited' | 'Rejected';
export type CompanyType = 'Public' | 'Private' | 'Non-profit';
export type CompanyUserPermission = 'view company details' | 'edit company details' | 'delete company' | 'view employee' | 'edit employee' | 'add employee' | 'delete employee' | 'view job' | 'edit job' | 'create job' | 'delete job' | 'view job application' | 'accept job application' | 'decline job application';
export type CompanyUserRole = 'owner' | 'hr' | 'employee';
export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Temporary' | 'Remote';
export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard';
export type InterviewExperience = 'Positive' | 'Negative' | 'Neutral';
export type UserRole = 'admin';
}
