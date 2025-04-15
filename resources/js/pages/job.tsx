import { SharePopup } from '@/components/share-popup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { Bookmark, Briefcase, Building2, Clock, ExternalLink, MapPin, Share2, Star } from 'lucide-react';
import { useState } from 'react';

export default function JobPage({ job }: { job: App.Data.Jobs.JobData }) {
    const [showSharePopup, setShowSharePopup] = useState(false);
    return (
        <>
            <SharePopup url={route('jobs.show', { slug: job.slug })} open={showSharePopup} onClose={() => setShowSharePopup(false)} />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-5xl">
                        {/* Job Header */}
                        <Card className="mb-6 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <img
                                        src={job.company.logo || '/placeholder.svg'}
                                        alt={`${job.company.name} logo`}
                                        className="h-16 w-16 rounded-md border object-contain"
                                    />
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold md:text-3xl">{job.title}</h1>
                                                <Link
                                                    href={route('companies.show', job.company.slug)}
                                                    className="text-lg text-orange-600 hover:underline"
                                                >
                                                    {job.company.name}
                                                </Link>
                                                <div className="mt-1 flex items-center">
                                                    <div className="flex items-center">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="ml-1 text-sm">{job.company.rating}</span>
                                                        <span className="ml-1 text-sm text-gray-500">({job.company.reviews_count} reviews)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    onClick={() => setShowSharePopup(true)}
                                                >
                                                    <Share2 className="mr-2 h-4 w-4" />
                                                    Share
                                                </Button>
                                                <Button variant="outline" size="sm" className="cursor-pointer">
                                                    <Bookmark className="mr-2 h-4 w-4" />
                                                    Save
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Briefcase className="mr-1 h-4 w-4 text-gray-400" />
                                                {job.employment_type}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Clock className="mr-1 h-4 w-4 text-gray-400" />
                                                Posted {new Date(job.posted_date).toDateString()}
                                            </div>
                                        </div>

                                        <div className="mt-3 text-lg font-medium">
                                            {job.salary_min} - {job.salary_max}$
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <Link href={route('jobs.apply', job.slug)}>
                                                <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">Easy Apply</Button>
                                            </Link>
                                            <Button variant="outline" className="cursor-pointer">
                                                <Building2 className="mr-2 h-4 w-4" />
                                                <a href={job.company.website ?? ''} target="_blank">
                                                    Visit Company Website
                                                </a>
                                                <ExternalLink className="ml-1 h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Job Details */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="space-y-6 md:col-span-2">
                                <Card className="shadow-md">
                                    <CardContent className="p-6">
                                        <Tabs defaultValue="description">
                                            <TabsList className="mb-6 grid w-full grid-cols-2">
                                                <TabsTrigger value="description" className="cursor-pointer">
                                                    Description
                                                </TabsTrigger>
                                                <TabsTrigger value="requirements" className="cursor-pointer">
                                                    Requirements
                                                </TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="description" className="space-y-4">
                                                <div>
                                                    <h2 className="mb-3 text-xl font-semibold">Job Description</h2>
                                                    <p className="text-gray-700">{job.description}</p>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="requirements" className="space-y-4">
                                                <div>
                                                    <h2 className="mb-3 text-xl font-semibold">Requirements</h2>
                                                    <ul className="list-disc space-y-1 pl-5 text-gray-700">
                                                        {job.requirements.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-md">
                                    <CardContent className="p-6">
                                        <h2 className="mb-4 text-xl font-semibold">About {job.company.name}</h2>
                                        <div className="mb-4 flex items-start gap-4">
                                            <img
                                                src={job.company.logo || '/placeholder.svg'}
                                                alt={`${job.company.name} logo`}
                                                className="h-16 w-16 rounded-md border object-contain"
                                            />
                                            <div>
                                                <Link
                                                    href={route('companies.show', job.company.slug)}
                                                    className="text-lg font-medium hover:underline"
                                                >
                                                    {job.company.name}
                                                </Link>
                                                <div className="mt-1 flex items-center">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < Math.floor(job.company.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="ml-1 text-sm">{job.company.rating}</span>
                                                    <span className="ml-1 text-sm text-gray-500">({job.company.reviews_count} reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <div className="flex items-start">
                                                    <span className="w-24 text-sm font-medium">Industry:</span>
                                                    <span className="text-sm text-gray-600">{job.company.industry}</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <span className="w-24 text-sm font-medium">Size:</span>
                                                    <span className="text-sm text-gray-600">{job.company.employee_count} employees</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <span className="w-24 text-sm font-medium">Founded:</span>
                                                    <span className="text-sm text-gray-600">{job.company.founded_year}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-start">
                                                    <span className="w-24 text-sm font-medium">Type:</span>
                                                    <span className="text-sm text-gray-600">{job.company.type}</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <span className="w-24 text-sm font-medium">CEO:</span>
                                                    <span className="text-sm text-gray-600">{job.company.ceo}</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <span className="w-24 text-sm font-medium">CEO Approval:</span>
                                                    <span className="text-sm text-gray-600">100%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600">
                                                {job.company.name} is a leading technology company focused on innovative solutions for enterprise
                                                clients.
                                            </p>
                                            <Link href={route('companies.show', job.company.slug)}>
                                                <Button variant="outline" size="sm" className="cursor-pointer">
                                                    View Company Profile
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className="shadow-md">
                                    <CardContent className="p-6">
                                        <h2 className="mb-4 text-lg font-semibold">Job Activity</h2>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Posted</span>
                                                <span className="text-sm font-medium">{new Date(job.posted_date).toDateString()}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Applicants</span>
                                                <span className="text-sm font-medium">{job.apply_count}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Views</span>
                                                <span className="text-sm font-medium">{job.visit_count}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <Link href={route('jobs.apply', job.slug)}>
                                                <Button className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600">Easy Apply</Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-md">
                                    <CardContent className="p-6">
                                        <h2 className="mb-4 text-lg font-semibold">More from {job.company.name}</h2>
                                        <div className="space-y-4">
                                            <Link href={route('companies.show', job.company.slug)} className="block">
                                                <div className="flex items-center gap-2 text-orange-600 hover:underline">
                                                    <Building2 className="h-4 w-4" />
                                                    <span className="text-sm">View company profile</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
