import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Edit, Users } from 'lucide-react';

export default function CompanyDashboard({ companies }: { companies: App.Data.Company.CompanyEditData[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
                <h1 className="mb-4 text-2xl font-bold">Manage your company profiles</h1>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => (
                    <Card key={company.id} className="flex flex-col">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-center md:items-start">
                                    <img
                                        data-slot="avatar-image"
                                        src={company.logo || '/placeholder.svg'}
                                        alt={`${company.name} logo`}
                                        className="h-24 w-24 rounded-md border bg-white object-contain shadow-sm"
                                    />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{company.name}</CardTitle>
                                    <Badge variant="outline" className="mt-1">
                                        {company.industry}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow pb-2">
                            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{company.description}</p>
                            <div className="grid grid-cols-1 gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Users className="text-muted-foreground h-4 w-4" />
                                    <span>{company.employee_count} employees</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href={route('dashboard.view', { slug: company.slug })} className="w-full">
                                <Button variant="outline" className="w-full">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
