import { JobApplicationSidebar } from '@/components/apply/job-application-sidebar';

export default function ApplyPage({ job }: { job: App.Data.Jobs.JobData }) {
    return (
        <div className="bg-background min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <h1 className="mb-6 text-2xl font-bold md:text-3xl">
                        Apply for {job.title} at {job.company.name}
                    </h1>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2"></div>

                        <div>
                            <JobApplicationSidebar job={job} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
