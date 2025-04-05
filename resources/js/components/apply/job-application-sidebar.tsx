import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, CheckCircle2, Clock, MapPin, Star } from 'lucide-react';

export function JobApplicationSidebar({ job }: { job: App.Data.Jobs.JobData }) {
    return (
        <div className="space-y-6">
            {/* Job Summary Card */}
            <Card className="shadow-sm">
                <CardHeader className="bg-background pb-3">
                    <CardTitle className="text-lg">Job Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <img
                                src={job.company.logo || '/placeholder.svg'}
                                alt={`${job.company.name} logo`}
                                className="h-12 w-12 rounded-md border object-contain"
                            />
                            <div>
                                <h3 className="font-semibold">{job.title}</h3>
                                <div className="mt-1 flex items-center">
                                    <span className="text-sm">{job.company.name}</span>
                                    <span className="text-foreground-muted mx-1">•</span>
                                    <div className="flex items-center">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="ml-1 text-sm">{job.company.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-foreground-muted flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                                {job.location}
                            </div>
                            <div className="text-foreground-muted flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-gray-400" />
                                Posted {job.posted_date}
                            </div>
                            <div className="text-foreground-muted text-sm font-medium">
                                Salary - {job.salary_min} - {job.salary_max}$
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h4 className="mb-2 text-sm font-semibold">Job Description</h4>
                            <p className="text-foreground-muted text-sm">{job.description}</p>
                        </div>

                        <div>
                            <h4 className="mb-2 text-sm font-semibold">Requirements</h4>
                            <ul className="text-foreground-muted list-disc space-y-1 pl-5 text-sm">
                                {job.requirements.map((req: string, index: number) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Application Tips Card */}
            <Card className="shadow-sm">
                <CardHeader className="bg-background pb-3">
                    <CardTitle className="text-lg">Application Tips</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                            <div>
                                <h3 className="text-sm font-medium">Tailor Your Resume</h3>
                                <p className="text-foreground-muted text-xs">
                                    Highlight skills and experiences that are relevant to this specific position.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                            <div>
                                <h3 className="text-sm font-medium">Be Specific in Your Cover Letter</h3>
                                <p className="text-foreground-muted text-xs">
                                    Explain why you're interested in this role and how your experience makes you a good fit.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                            <div>
                                <h3 className="text-sm font-medium">Research the Company</h3>
                                <p className="text-foreground-muted text-xs">
                                    Show that you understand the company's mission, values, and industry position.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                            <div>
                                <h3 className="text-sm font-medium">Follow Up</h3>
                                <p className="text-foreground-muted text-xs">
                                    If you don't hear back within a week, consider sending a polite follow-up email.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Company Info Card */}
            <Card className="shadow-sm">
                <CardHeader className="bg-background pb-3">
                    <CardTitle className="text-lg">About {job.company.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="mb-3 flex items-center">
                        <Building2 className="bg-text mr-2 h-5 w-5" />
                        <span className="text-sm font-medium">Company Overview</span>
                    </div>
                    <p className="text-foreground-muted mb-4 text-sm">
                        {job.company.name} is a leading technology company focused on innovative solutions for enterprise clients. With a strong
                        emphasis on employee development and work-life balance, we strive to create an inclusive and collaborative environment.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
