import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Server } from 'lucide-react';
import { useState } from 'react';
import JobCard from './job-card';

type Job = {
    id: string;
    title: string;
    description: string;
    location: string;
    isRemote: boolean;
    type: string;
    posted: string;
    salary: string;
    requirements: string[];
    isSaved: boolean;
    isEasyApply: boolean;
    company: {
        id: string;
        name: string;
        logo?: React.ReactNode;
        rating: number;
        reviews: number;
    };
};

const jobs: Job[] = [
    {
        id: '1',
        title: 'Senior Software Engineer',
        company: {
            id: 'techcorp',
            name: 'TechCorp',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 4.2,
            reviews: 2500,
        },
        location: 'San Francisco, CA',
        type: 'Full-time',
        isRemote: true,
        salary: '$120K - $160K',
        description:
            "We're looking for a Senior Software Engineer to join our team. You'll be responsible for designing, developing, and maintaining our core platform services.",
        requirements: [
            '5+ years of experience in software development',
            'Strong knowledge of JavaScript, TypeScript, and React',
            'Experience with Node.js and RESTful APIs',
            "Bachelor's degree in Computer Science or related field",
        ],
        posted: '2 days ago',
        isEasyApply: true,
        isSaved: false,
    },
    {
        id: '2',
        title: 'Product Manager',
        company: {
            id: 'innovateco',
            name: 'InnovateCo',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 4.5,
            reviews: 1800,
        },
        location: 'New York, NY',
        type: 'Full-time',
        isRemote: false,
        salary: '$110K - $140K',
        description:
            "Join our product team to lead the development of innovative solutions. You'll work closely with engineering, design, and marketing teams to deliver exceptional products.",
        requirements: [
            '3+ years of product management experience',
            'Strong analytical and problem-solving skills',
            'Excellent communication and leadership abilities',
            'Experience with agile methodologies',
        ],
        posted: '1 day ago',
        isEasyApply: true,
        isSaved: true,
    },
    {
        id: '3',
        title: 'UX/UI Designer',
        company: {
            id: 'designhub',
            name: 'DesignHub',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 4.0,
            reviews: 1200,
        },
        location: 'Austin, TX',
        type: 'Full-time',
        isRemote: true,
        salary: '$90K - $120K',
        description:
            "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products. You'll collaborate with product managers and engineers to deliver exceptional user experiences.",
        requirements: [
            '3+ years of experience in UX/UI design',
            'Proficiency with design tools like Figma or Sketch',
            'Strong portfolio demonstrating your design process',
            'Experience with user research and testing',
        ],
        posted: '3 days ago',
        isEasyApply: false,
        isSaved: false,
    },
    {
        id: '4',
        title: 'Marketing Specialist',
        company: {
            id: 'growthlabs',
            name: 'GrowthLabs',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 3.8,
            reviews: 800,
        },
        location: 'Chicago, IL',
        type: 'Full-time',
        isRemote: false,
        salary: '$70K - $90K',
        description:
            "Join our marketing team to develop and execute marketing campaigns. You'll be responsible for content creation, social media management, and campaign analytics.",
        requirements: [
            '2+ years of marketing experience',
            'Strong writing and communication skills',
            'Experience with social media platforms and analytics tools',
            "Bachelor's degree in Marketing or related field",
        ],
        posted: '5 days ago',
        isEasyApply: true,
        isSaved: false,
    },
    {
        id: '5',
        title: 'Data Scientist',
        company: {
            id: 'fintech',
            name: 'FinTech Solutions',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 4.3,
            reviews: 3200,
        },
        location: 'Boston, MA',
        type: 'Full-time',
        isRemote: true,
        salary: '$130K - $160K',
        description:
            "We're looking for a Data Scientist to help us extract insights from complex datasets. You'll build models and algorithms to solve business problems and drive decision-making.",
        requirements: [
            '3+ years of experience in data science or related field',
            'Strong programming skills in Python or R',
            'Experience with machine learning and statistical analysis',
            "Master's degree or PhD in a quantitative field",
        ],
        posted: '1 week ago',
        isEasyApply: false,
        isSaved: true,
    },
    {
        id: '6',
        title: 'DevOps Engineer',
        company: {
            id: 'cloudtech',
            name: 'CloudTech',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 4.1,
            reviews: 1500,
        },
        location: 'Seattle, WA',
        type: 'Full-time',
        isRemote: true,
        salary: '$115K - $145K',
        description:
            "Join our DevOps team to build and maintain our cloud infrastructure. You'll automate deployment processes and ensure the reliability and scalability of our systems.",
        requirements: [
            '3+ years of experience in DevOps or SRE roles',
            'Experience with AWS, Azure, or GCP',
            'Knowledge of containerization and orchestration tools',
            'Strong scripting skills in Python, Bash, or similar',
        ],
        posted: '3 days ago',
        isEasyApply: true,
        isSaved: false,
    },
    {
        id: '7',
        title: 'Customer Success Manager',
        company: {
            id: 'saas',
            name: 'SaaS Solutions',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 4.0,
            reviews: 950,
        },
        location: 'Denver, CO',
        type: 'Full-time',
        isRemote: true,
        salary: '$80K - $100K',
        description:
            "We're seeking a Customer Success Manager to ensure our clients achieve their goals using our platform. You'll build relationships with key accounts and drive customer satisfaction and retention.",
        requirements: [
            '2+ years of experience in customer success or account management',
            'Strong communication and relationship-building skills',
            'Experience with CRM software',
            "Bachelor's degree in Business or related field",
        ],
        posted: '4 days ago',
        isEasyApply: false,
        isSaved: false,
    },
    {
        id: '8',
        title: 'Frontend Developer',
        company: {
            id: 'webworks',
            name: 'WebWorks',
            logo: <Server className="h-12 w-12 text-green-500" />,
            rating: 3.9,
            reviews: 950,
        },
        location: 'Portland, OR',
        type: 'Contract',
        isRemote: true,
        salary: '$50 - $70 per hour',
        description:
            "We're looking for a Frontend Developer to join our team on a contract basis. You'll work on building responsive and accessible web applications using modern frameworks.",
        requirements: [
            '2+ years of experience in frontend development',
            'Proficiency with React, Vue, or Angular',
            'Strong HTML, CSS, and JavaScript skills',
            'Experience with responsive design and accessibility',
        ],
        posted: '2 days ago',
        isEasyApply: true,
        isSaved: false,
    },
];

export function JobList() {
    const [sortOption, setSortOption] = useState('relevance');

    const sortedJobs = [...jobs].sort((a, b) => {
        if (sortOption === 'datePosted') {
            return a.posted.includes('day') && b.posted.includes('week') ? -1 : 1;
        } else if (sortOption === 'salary') {
            const aSalary = Number.parseInt(a.salary.replace(/[^0-9]/g, ''));
            const bSalary = Number.parseInt(b.salary.replace(/[^0-9]/g, ''));
            return bSalary - aSalary;
        }
        return 0;
    });

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{jobs.length} Jobs</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select defaultValue="relevance" onValueChange={setSortOption}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="datePosted">Date Posted</SelectItem>
                            <SelectItem value="salary">Salary</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                {sortedJobs.map((job) => (
                    <JobCard job={job} />
                ))}
            </div>

            <div className="mt-8 text-center">
                <Button variant="outline" className="mx-auto">
                    Load More Jobs
                </Button>
            </div>
        </div>
    );
}
