import { CompanyReviewCard } from '@/components/homepage/company-review-card';
import JobCard from '@/components/jobs/job-card';
import ReviewModal from '@/components/reviews/review-modal';
import { SharePopup } from '@/components/share-popup';
import StarRating from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Building2, CheckCircle, ExternalLink, Globe, Heart, MapPin, MessageSquare, Share2, Users } from 'lucide-react';
import { useState } from 'react';

export default function CompanyPage({ company }: { company: App.Data.Company.CompanyData }) {
    const [tab, setTab] = useState('overview');
    const [showSharePopup, setShowSharePopup] = useState(false);

    const workLifeBalanceRating =
        Math.round(
            (company.reviews.length > 0 ? company.reviews.reduce((sum, review) => sum + review.work_life_balance, 0) / company.reviews.length : 0) *
                10,
        ) / 10;

    const cultureValuesRating =
        Math.round(
            (company.reviews.length > 0 ? company.reviews.reduce((sum, review) => sum + review.culture_values, 0) / company.reviews.length : 0) * 10,
        ) / 10;

    const careerOpportunitiesRating =
        Math.round(
            (company.reviews.length > 0
                ? company.reviews.reduce((sum, review) => sum + review.career_opportunities, 0) / company.reviews.length
                : 0) * 10,
        ) / 10;

    const compensationBenefitsRating =
        Math.round(
            (company.reviews.length > 0
                ? company.reviews.reduce((sum, review) => sum + review.compensation_benefits, 0) / company.reviews.length
                : 0) * 10,
        ) / 10;

    const seniorManagementRating =
        Math.round(
            (company.reviews.length > 0 ? company.reviews.reduce((sum, review) => sum + review.senior_management, 0) / company.reviews.length : 0) *
                10,
        ) / 10;

    return (
        <>
            <SharePopup url={route('companies.show', { slug: company.slug })} open={showSharePopup} onClose={() => setShowSharePopup(false)} />
            <Head title={company.name} />
            <div className="bg-background min-h-screen">
                {/* Cover Image */}
                <div className="bg-primary relative h-48 md:h-64">
                    <img src={company.header ?? ''} alt={`${company.name} cover`} className="h-full w-full object-cover" />
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-6xl">
                        {/* Company Header */}
                        <div className="relative -mt-20 mb-8">
                            <div className="bg-background rounded-lg p-6 shadow-md">
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <div className="flex flex-col items-center md:items-start">
                                        <img
                                            src={company.logo || '/placeholder.svg'}
                                            alt={`${company.name} logo`}
                                            className="h-24 w-24 rounded-md border bg-white object-contain shadow-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h1 className="text-2xl font-bold md:text-3xl">{company.name}</h1>
                                                <div className="mt-1 flex items-center">
                                                    <div className="flex">
                                                        <StarRating rating={company.rating} readOnly />
                                                    </div>
                                                    <span className="ml-1 text-lg font-bold">{company.rating}</span>
                                                    <span className="ml-1 text-sm text-gray-500">({company.reviews_count} reviews)</span>
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
                                                    <Heart className="mr-2 h-4 w-4" />
                                                    Follow
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-4">
                                            <div className="bg-text flex items-center text-sm">
                                                <Building2 className="bg-text mr-1 h-4 w-4" />
                                                {company.industry}
                                            </div>
                                            <div className="bg-text flex items-center text-sm">
                                                <MapPin className="bg-text mr-1 h-4 w-4" />
                                                {company.location}
                                            </div>
                                            <div className="bg-text flex items-center text-sm">
                                                <Users className="bg-text mr-1 h-4 w-4" />
                                                {company.employee_count}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <ReviewModal companySlug={company.slug} />
                                            <Button onClick={() => setTab('jobs')} variant="outline" className="cursor-pointer">
                                                <Briefcase className="mr-2 h-4 w-4" />
                                                See All Jobs {company.jobs_count}
                                            </Button>
                                            <a href={company.website} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" className="cursor-pointer">
                                                    <Globe className="mr-2 h-4 w-4" />
                                                    Visit Website
                                                    <ExternalLink className="ml-1 h-3 w-3" />
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Content */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="space-y-6 md:col-span-2">
                                <Card className="shadow-md">
                                    <CardContent className="p-6">
                                        <Tabs value={tab} onValueChange={setTab}>
                                            <TabsList className="mb-6 grid w-full grid-cols-3 gap-4">
                                                <TabsTrigger value="overview" className="cursor-pointer">
                                                    Overview
                                                </TabsTrigger>
                                                <TabsTrigger value="reviews" className="cursor-pointer">
                                                    Reviews
                                                </TabsTrigger>
                                                <TabsTrigger value="jobs" id="jobs" className="cursor-pointer">
                                                    Jobs
                                                </TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="overview" className="space-y-6">
                                                <div>
                                                    <h2 className="mb-3 text-xl font-semibold">About {company.name}</h2>
                                                    <p className="bg-text">{company.description}</p>
                                                </div>

                                                <Separator />

                                                <div>
                                                    <h3 className="mb-2 text-lg font-semibold">Mission</h3>
                                                    <p className="bg-text">{company.mission}</p>
                                                </div>

                                                <Separator />

                                                <div>
                                                    <h3 className="mb-3 text-lg font-semibold">Company Details</h3>
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <div className="flex items-start">
                                                                <span className="w-24 text-sm font-medium">Industry:</span>
                                                                <span className="bg-text text-sm">{company.industry}</span>
                                                            </div>
                                                            <div className="flex items-start">
                                                                <span className="w-24 text-sm font-medium">Size:</span>
                                                                <span className="bg-text text-sm">{company.employee_count} employees</span>
                                                            </div>
                                                            <div className="flex items-start">
                                                                <span className="w-24 text-sm font-medium">Founded:</span>
                                                                <span className="bg-text text-sm">
                                                                    {new Date(company.founded_year).getFullYear()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-start">
                                                                <span className="w-24 text-sm font-medium">Type:</span>
                                                                <span className="bg-text text-sm">{company.type} Company</span>
                                                            </div>
                                                            <div className="flex items-start">
                                                                <span className="w-24 text-sm font-medium">CEO:</span>
                                                                <span className="bg-text text-sm">{company.ceo}</span>
                                                            </div>
                                                            <div className="flex items-start">
                                                                <span className="w-24 text-sm font-medium">Website:</span>
                                                                <a
                                                                    href={company.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm text-orange-600 hover:underline"
                                                                >
                                                                    Link
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div>
                                                    <h3 className="mb-3 text-lg font-semibold">Company Benefits</h3>
                                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                                        {company.benefits.map((benefit, index) => (
                                                            <div key={index} className="bg-muted flex items-center rounded-md p-2">
                                                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                                <span className="text-sm">{benefit}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="reviews" className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-semibold">Employee Reviews</h2>
                                                    <ReviewModal companySlug={company.slug} />
                                                </div>

                                                {company.reviews.map((review) => (
                                                    <CompanyReviewCard key={review.id} company={company} review={review} />
                                                ))}
                                                <Link href={`/companies/${company.id}/reviews`}>
                                                    <Button variant="outline" className="w-full cursor-pointer">
                                                        <MessageSquare className="mr-2 h-4 w-4" />
                                                        Read All {company.reviews_count} Reviews
                                                    </Button>
                                                </Link>
                                            </TabsContent>

                                            <TabsContent value="jobs" className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-semibold">Open Jobs</h2>
                                                    <span className="bg-text text-sm">{company.jobs_count} jobs available</span>
                                                </div>

                                                {company.jobs.map((job) => (
                                                    <JobCard key={job.id} job={job} company={company} />
                                                ))}
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className="shadow-md">
                                    <CardHeader className="pb-3">
                                        <CardTitle>Company Ratings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="text-3xl font-bold">{company.rating}</div>
                                            <div className="flex">
                                                <StarRating rating={company.rating} readOnly />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Work-Life Balance</span>
                                                    <span className="font-medium">{workLifeBalanceRating}</span>
                                                </div>
                                                <Progress value={workLifeBalanceRating * 20} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Culture & Values</span>
                                                    <span className="font-medium">{cultureValuesRating}</span>
                                                </div>
                                                <Progress value={cultureValuesRating * 20} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Career Opportunities</span>
                                                    <span className="font-medium">{careerOpportunitiesRating}</span>
                                                </div>
                                                <Progress value={careerOpportunitiesRating * 20} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Compensation & Benefits</span>
                                                    <span className="font-medium">{compensationBenefitsRating}</span>
                                                </div>
                                                <Progress value={compensationBenefitsRating * 20} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Senior Management</span>
                                                    <span className="font-medium">{seniorManagementRating}</span>
                                                </div>
                                                <Progress value={seniorManagementRating * 20} className="h-2" />
                                            </div>
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div className="bg-background rounded-md p-3 shadow">
                                                <div className="text-2xl font-bold text-orange-600">{company.recommend}%</div>
                                                <div className="bg-text text-xs">Recommend to a Friend</div>
                                            </div>
                                            <div className="bg-background rounded-md p-3 shadow">
                                                <div className="text-2xl font-bold text-orange-600">60%</div>
                                                <div className="bg-text text-xs">Approve of CEO</div>
                                            </div>
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
