declare namespace App.Data {
export type UserData = {
id: number;
name: string;
image: string;
};
}
declare namespace App.Data.Companies {
export type CompanyData = {
logo: string | null;
header: string | null;
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
ceo: string;
mission: string | null;
benefits: Array<string>;
type: App.Enums.CompanyType;
};
}
declare namespace App.Data.Company {
export type CompanyData = {
logo: string | null;
header: string | null;
jobs: Array<App.Data.Company.CompanyJobData>;
reviews: Array<App.Data.Company.CompanyReviewData>;
id: number;
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
slug: string;
ceo: string;
mission: string | null;
benefits: Array<string>;
type: App.Enums.CompanyType;
jobs_count: number;
website: string;
};
export type CompanyJobData = {
id: number;
company_id: number;
title: string;
location: string;
employment_type: App.Enums.EmploymentType;
posted_date: string;
salary_range: string | null;
description: string;
slug: string;
requirements: Array<string>;
salary_min: number;
salary_max: number;
};
export type CompanyReviewData = {
user: App.Data.UserData;
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
}
declare namespace App.Data.Home {
export type ReviewCompanyData = {
logo: string;
id: number;
name: string;
};
export type ReviewData = {
user: App.Data.UserData;
company: App.Data.Home.ReviewCompanyData;
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
export type UserPermission = {
name: string;
value: string;
};
export type CompanyType = 'Public' | 'Private' | 'Non-profit';
export type CompanyUserPermission = 'view company details' | 'edit company details' | 'delete company' | 'view employee' | 'edit employee' | 'add employee' | 'delete employee' | 'view job' | 'edit job' | 'create job' | 'delete job' | 'view job application' | 'accept job application' | 'decline job application';
export type CompanyUserRole = 'owner' | 'hr' | 'employee';
export type EmploymentExperience = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Manager' | 'Director' | 'Executive';
export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Temporary' | 'Remote';
export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard';
export type InterviewExperience = 'Positive' | 'Negative' | 'Neutral';
export type UserRole = 'admin';
}
