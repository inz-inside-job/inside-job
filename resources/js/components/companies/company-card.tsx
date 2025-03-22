import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { Building2, DollarSign, MapPin, Star, ThumbsUp, Users } from 'lucide-react';

type Company = {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    industry: string;
    overview: string;
    employees: number;
    avgSalary: string;
    recommendPercent: number;
    logo?: React.ReactNode;
    badge?: {
        label: string;
        icon: React.ReactNode;
    };
};

export default function CompanyCard({ company }: { company: Company }) {
    return (
        <Link href={`/companies/${company.id}`}>
            <Card className="border-gray-light hover:border-orange/20 h-full w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <CardHeader className="p-6">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                        <div className="bg-gray-light group-hover:bg-orange/10 flex h-16 w-16 items-center justify-center rounded-lg transition-colors sm:h-24 sm:w-24">
                            {company.logo || <Building2 className="text-gray-dark h-12 w-12" />}
                        </div>
                        <div className="space-y-1.5 text-center sm:text-left">
                            <div className="flex items-center gap-4">
                                <h2 className="text-gray-dark text-2xl font-semibold">{company.name}</h2>
                                {company.badge && (
                                    <Badge className="bg-orange text-cream h-6">
                                        {company.badge.icon}
                                        {company.badge.label}
                                    </Badge>
                                )}
                            </div>
                            <div className="text-gray-dark/70 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{company.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`h-5 w-5 ${
                                                index < Math.floor(company.rating) ? 'fill-orange text-orange' : 'fill-gray-light stroke-gray-dark/50'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-dark/70 text-sm">
                                    {company.rating.toFixed(1)} • {company.reviews.toLocaleString()} reviews
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-gray-dark font-semibold">Company Overview</h3>
                            <Badge variant="outline" className="border-gray-light text-gray-dark">
                                {company.industry}
                            </Badge>
                        </div>
                        <p className="text-gray-dark/70 text-sm leading-relaxed">{company.overview}</p>
                    </div>
                    <Separator className="bg-gray-light" />
                    <div className="grid gap-4">
                        <h3 className="text-gray-dark font-semibold">Key Statistics</h3>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Users className="text-gray-dark/70 h-4 w-4" />
                                    <span className="text-gray-dark text-sm font-medium">Size</span>
                                </div>
                                <p className="text-gray-dark text-2xl font-semibold">{company.employees.toLocaleString()}+</p>
                                <span className="text-gray-dark/70 text-sm">Employees</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="text-gray-dark/70 h-4 w-4" />
                                    <span className="text-gray-dark text-sm font-medium">Average Salary</span>
                                </div>
                                <p className="text-gray-dark text-2xl font-semibold">{company.avgSalary}</p>
                                <span className="text-gray-dark/70 text-sm">Per year</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <ThumbsUp className="text-gray-dark/70 h-4 w-4" />
                                    <span className="text-gray-dark text-sm font-medium">Would Recommend</span>
                                </div>
                                <Progress value={company.recommendPercent} className="bg-gray-light [&>div]:bg-orange h-2" />
                                <span className="text-gray-dark/70 text-sm">{company.recommendPercent}% of employees</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
