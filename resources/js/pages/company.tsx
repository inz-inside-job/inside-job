import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, Link } from '@inertiajs/react';
import {
    Briefcase,
    Building2,
    Camera,
    CheckCircle,
    DollarSign,
    ExternalLink,
    FileText,
    Globe,
    Heart,
    MapPin,
    MessageSquare,
    Share2,
    Star,
    ThumbsUp,
    Users,
} from 'lucide-react';

export default function CompanyPage({ company }: { company: App.Data.CompanyPageData }) {
    console.log(company);
    return (
        <>
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
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-5 w-5 ${i < Math.floor(company.rating) ? 'fill-yellow-400 text-yellow-400' : 'bg-text'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="ml-1 text-lg font-bold">{company.rating}</span>
                                                    <span className="ml-1 text-sm text-gray-500">({company.reviews_count} reviews)</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Share2 className="mr-2 h-4 w-4" />
                                                    Share
                                                </Button>
                                                <Button variant="outline" size="sm">
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
                                            <Link href={`/companies/${company.id}/reviews`}>
                                                <Button className="bg-orange-500 hover:bg-orange-600">
                                                    <Star className="mr-2 h-4 w-4" />
                                                    Write a Review
                                                </Button>
                                            </Link>
                                            <Link href={`/companies/${company.id}#jobs`}>
                                                <Button variant="outline">
                                                    <Briefcase className="mr-2 h-4 w-4" />
                                                    See All Jobs {company.jobs_count}
                                                </Button>
                                            </Link>
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
                                        <Tabs defaultValue="overview">
                                            <TabsList className="mb-6 grid w-full grid-cols-4 gap-4">
                                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                                <TabsTrigger value="jobs" id="jobs">
                                                    Jobs
                                                </TabsTrigger>
                                                <TabsTrigger value="photos">Photos</TabsTrigger>
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
                                                                    {new Date(parseInt(company.founded_year) * 1000).getFullYear()}
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
                                                                    {company.website}
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
                                                    <Link href={`/companies/${company.id}/reviews`}>
                                                        <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">
                                                            <Star className="mr-2 h-4 w-4" />
                                                            Write a Review
                                                        </Button>
                                                    </Link>
                                                </div>

                                                <div className="bg-background rounded-lg border p-4">
                                                    <div className="mb-4 flex items-start justify-between">
                                                        <h3 className="font-medium">zr bosai ir debilai</h3>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < Math.floor(company.rating) ? 'fill-yellow-400 text-yellow-400' : 'bg-text'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="bg-text mb-3 text-xs">Gintaras Gaucys - vakar</div>

                                                    <div className="mb-3">
                                                        <div className="mb-1 text-xs font-medium">Pros:</div>
                                                        <p className="bg-text text-sm">krc bosai yra</p>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="mb-1 text-xs font-medium">Cons:</div>
                                                        <p className="text-smbg-text">krc debilai yra</p>
                                                    </div>

                                                    <div className="bg-text flex items-center justify-between text-xs">
                                                        <div className="flex items-center">
                                                            <Avatar className="mr-1 h-5 w-5">
                                                                <AvatarImage />
                                                                <AvatarFallback>GG</AvatarFallback>
                                                            </Avatar>
                                                            <span>Current Employee</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <ThumbsUp className="mr-1 h-3 w-3" />
                                                            <span>69 found helpful</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link href={`/companies/${company.id}/reviews`}>
                                                    <Button variant="outline" className="w-full">
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

                                                {/* <CompanyOpenJobs companyId={company.id} /> */}
                                            </TabsContent>

                                            <TabsContent value="photos" className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-semibold">Company Photos</h2>
                                                    <Button variant="outline" size="sm">
                                                        <Camera className="mr-2 h-4 w-4" />
                                                        Add Photos
                                                    </Button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    {/* {company.photos.map((photo, index) => (
                                                        <div key={index} className="aspect-video overflow-hidden rounded-md border">
                                                            <img
                                                                src={photo || '/placeholder.svg'}
                                                                alt={`${company.name} workplace ${index + 1}`}
                                                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                            />
                                                        </div>
                                                    ))} */}
                                                    photos
                                                </div>

                                                <Button variant="outline" className="w-full">
                                                    View All Photos
                                                </Button>
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
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-5 w-5 ${i < Math.floor(company.rating) ? 'fill-yellow-400 text-yellow-400' : 'bg-text'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Work-Life Balance</span>
                                                    <span className="font-medium">bing</span>
                                                </div>
                                                <Progress value={20} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Culture & Values</span>
                                                    <span className="font-medium">bong</span>
                                                </div>
                                                <Progress value={50} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Career Opportunities</span>
                                                    <span className="font-medium">bang</span>
                                                </div>
                                                <Progress value={60} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Compensation & Benefits</span>
                                                    <span className="font-medium">bop</span>
                                                </div>
                                                <Progress value={70} className="h-2" />
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Senior Management</span>
                                                    <span className="font-medium">bap</span>
                                                </div>
                                                <Progress value={90} className="h-2" />
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

                                <Card className="shadow-md">
                                    <CardHeader className="pb-3">
                                        <CardTitle>Company Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 p-4">
                                        <Link href={`/companies/${company.id}/reviews/write`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <Star className="mr-2 h-4 w-4" />
                                                Write a Review
                                            </Button>
                                        </Link>
                                        <Link href={`/companies/${company.id}/photos/add`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <Camera className="mr-2 h-4 w-4" />
                                                Add Photos
                                            </Button>
                                        </Link>
                                        <Link href={`/companies/${company.id}/salaries`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <DollarSign className="mr-2 h-4 w-4" />
                                                Add Salary
                                            </Button>
                                        </Link>
                                        <Link href={`/companies/${company.id}/interviews`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FileText className="mr-2 h-4 w-4" />
                                                Add Interview
                                            </Button>
                                        </Link>
                                        <Button variant="outline" className="w-full justify-start">
                                            <Heart className="mr-2 h-4 w-4" />
                                            Follow
                                        </Button>
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
