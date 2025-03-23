import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Badge, Bookmark, Briefcase, Building2, Clock, ExternalLink, MapPin, Star } from 'lucide-react';

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

export default function JobCard({ job }: { job: Job }) {
    return (
        <Card className="border-gray-light hover:border-orange/20 h-full w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <CardHeader className="p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="bg-gray-light group-hover:bg-orange/10 flex h-16 w-16 items-center justify-center rounded-lg transition-colors sm:h-24 sm:w-24">
                        {job.company.logo || <Building2 className="text-gray-dark h-12 w-12" />}
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-gray-dark text-xl font-semibold">
                                    <Link href={`/jobs/${job.id}`} className="hover:underline">
                                        {job.title}
                                    </Link>
                                </h2>
                                <div className="mt-2 flex items-center gap-2">
                                    <Link href={`/companies/${job.company.id}`} className="text-gray-dark/70 hover:underline">
                                        {job.company.name}
                                    </Link>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`h-4 w-4 ${
                                                    index < Math.floor(job.company.rating)
                                                        ? 'fill-orange text-orange'
                                                        : 'fill-gray-light stroke-gray-dark/50'
                                                }`}
                                            />
                                        ))}
                                        <span className="text-gray-dark/70 text-sm">
                                            {job.company.rating.toFixed(1)} • {job.company.reviews.toLocaleString()} reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className={`h-8 w-8 ${job.isSaved ? 'text-orange' : 'text-gray-dark/70'}`}>
                                <Bookmark className={`h-5 w-5 ${job.isSaved ? 'fill-orange' : ''}`} />
                                <span className="sr-only">Save job</span>
                            </Button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="text-gray-dark/70 flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {job.location}
                                {job.isRemote && <Badge className="bg-orange/10 text-orange ml-2">Remote</Badge>}
                            </div>
                            <div className="text-gray-dark/70 flex items-center">
                                <Briefcase className="mr-1 h-4 w-4" />
                                {job.type}
                            </div>
                            <div className="text-gray-dark/70 flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {job.posted}
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="grid gap-6 p-6 pt-0">
                <div className="grid gap-4">
                    <p className="text-gray-dark/70 line-clamp-2 text-sm leading-relaxed">{job.description}</p>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-gray-dark mb-2 text-sm font-semibold">Requirements:</h4>
                            <ul className="text-gray-dark/70 list-disc space-y-1 pl-5 text-sm">
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-gray-dark/70 flex items-center text-sm">
                            <Building2 className="mr-1 h-4 w-4" />
                            <Link href={`/companies/${job.company.id}`} className="hover:underline">
                                View company profile
                            </Link>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-gray-dark font-medium">{job.salary}</div>
                    </div>
                </div>

                <div className="border-gray-light flex items-center justify-between border-t pt-4">
                    <div className="text-gray-dark/70 text-sm">Be an early applicant</div>
                    <div className="flex gap-3">
                        {job.isEasyApply ? (
                            <Link href={`/jobs/${job.id}/apply`}>
                                <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">Easy Apply</Button>
                            </Link>
                        ) : (
                            <Link href={`/jobs/${job.id}/apply`}>
                                <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">
                                    Apply Now <ExternalLink className="ml-1 h-3 w-3" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
