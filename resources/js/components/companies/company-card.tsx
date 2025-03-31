import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useInitials } from '@/hooks/use-initials';
import { Link } from '@inertiajs/react';
import { DollarSign, MapPin, ThumbsUp, Users } from 'lucide-react';
import StarRating from '../star-rating';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

export default function CompanyCard({ company }: { company: App.Data.Companies.CompanyData | App.Data.Company.CompanyData }) {
    const getInitials = useInitials();

    return (
        <Link href={route('companies.show', { slug: company.slug })}>
            <Card className="border-gray-light hover:border-orange/20 h-full w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <CardHeader className="p-6">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                        <div className="bg-gray-light group-hover:bg-orange/10 flex h-16 w-16 items-center justify-center rounded-lg transition-colors sm:h-24 sm:w-24">
                            <Avatar className="h-15 w-15">
                                <AvatarImage src={company.logo ?? ''} alt={''} />
                                <AvatarFallback>{getInitials(company.name)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-1.5 text-center sm:text-left">
                            <div className="flex items-center gap-4">
                                <h2 className="text-gray-dark text-2xl font-semibold">{company.name}</h2>
                            </div>
                            <div className="text-gray-dark/70 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{company.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <StarRating rating={company.rating} readOnly />
                                <span className="text-gray-dark/70 text-sm">
                                    {company.rating.toFixed(1)} • {company.reviews_count!.toLocaleString()} reviews
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
                        <p className="text-gray-dark/70 text-sm leading-relaxed">{company.description}</p>
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
                                <p className="text-gray-dark text-2xl font-semibold">{company.employee_count.toLocaleString()}+</p>
                                <span className="text-gray-dark/70 text-sm">Employees</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="text-gray-dark/70 h-4 w-4" />
                                    <span className="text-gray-dark text-sm font-medium">Average Salary</span>
                                </div>
                                <p className="text-gray-dark text-2xl font-semibold">{company.average_salary}</p>
                                <span className="text-gray-dark/70 text-sm">Per year</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <ThumbsUp className="text-gray-dark/70 h-4 w-4" />
                                    <span className="text-gray-dark text-sm font-medium">Would Recommend</span>
                                </div>
                                <Progress value={company.recommend} className="bg-gray-light [&>div]:bg-orange h-2 border-2" />
                                <span className="text-gray-dark/70 text-sm">{company.recommend}% of employees</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
