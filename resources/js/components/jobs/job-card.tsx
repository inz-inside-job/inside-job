import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { moneyToHuman } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Badge, Briefcase, Building2, Clock, MapPin } from 'lucide-react';
import StarRating from '../star-rating';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function JobCard({
    job,
    company,
}: {
    job: App.Data.Jobs.JobData | App.Data.Company.CompanyJobData;
    company: App.Data.Jobs.JobCompanyData | App.Data.Company.CompanyData;
}) {
    const getInitials = useInitials();

    return (
        <Card className="border-gray-light hover:border-orange/20 h-full w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <CardHeader className="p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="bg-gray-light group-hover:bg-orange/10 flex h-16 w-16 items-center justify-center rounded-lg transition-colors sm:h-24 sm:w-24">
                        <Avatar className="h-15 w-15">
                            <AvatarImage src={company.logo ?? ''} alt={''} />
                            <AvatarFallback>{getInitials(company.name)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 space-y-1.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-gray-dark text-xl font-semibold">
                                    {/* TODO: Use route link */}
                                    <Link href={route('jobs.show', { slug: job.slug })} className="hover:underline">
                                        {job.title}
                                    </Link>
                                </h2>
                                <div className="mt-2 flex items-center gap-2">
                                    <Link href={route('companies.show', { slug: company.slug })} className="text-gray-dark/70 hover:underline">
                                        {company.name}
                                    </Link>
                                    <div className="flex items-center gap-1">
                                        <StarRating rating={company.rating} readOnly />
                                        <span className="text-gray-dark/70 text-sm">
                                            {company.rating.toFixed(1)} • {company.reviews_count.toLocaleString()} reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="text-gray-dark/70 flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {job.location}
                                {job.employment_type === 'Remote' && <Badge className="bg-orange/10 text-orange ml-2">Remote</Badge>}
                            </div>
                            <div className="text-gray-dark/70 flex items-center">
                                <Briefcase className="mr-1 h-4 w-4" />
                                {job.employment_type}
                            </div>
                            <div className="text-gray-dark/70 flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {new Date(job.posted_date).toLocaleDateString()}
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
                            <Link href={route('companies.show', { slug: company.slug })} className="hover:underline">
                                View company profile
                            </Link>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-gray-dark font-medium">
                            {moneyToHuman(job.salary_min)} - {moneyToHuman(job.salary_max)}
                        </div>
                    </div>
                </div>

                <div className="border-gray-light flex items-center justify-between border-t pt-4">
                    <div className="text-gray-dark/70 text-sm">Be an early applicant</div>
                    <div className="flex gap-3">
                        <Link href={route('jobs.apply', { slug: job.slug })}>
                            <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">Easy Apply</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
