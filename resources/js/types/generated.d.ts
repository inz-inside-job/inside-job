declare namespace App.Data {
export type CompanyData = {
logo: string | null;
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
};
export type CompanySubmissionCountsData = {
pending: number;
approved: number;
rejected: number;
total: number;
};
export type CompanySubmissionData = {
user: any;
name: string;
industry: string;
description: string;
employee_count: number;
founded_year: string;
status: string;
created_at: string;
id: number;
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
export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Temporary' | 'Remote';
export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard';
export type InterviewExperience = 'Positive' | 'Negative' | 'Neutral';
export type UserRole = 'admin';
}
