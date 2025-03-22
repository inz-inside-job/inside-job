import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, Search, Star } from 'lucide-react';

export function CompaniesHero() {
    return (
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto mb-8 max-w-3xl text-center">
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">Find Companies You'll Love Working For</h1>
                    <p className="text-lg opacity-90">Read millions of company reviews and ratings from employees who know best</p>
                </div>

                <div className="bg-background mx-auto max-w-2xl rounded-lg p-4 shadow-lg">
                    <div className="grid grid-cols-1 gap-3">
                        <div className="relative">
                            <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input className="text-foreground pl-10" placeholder="Search by company name, culture, benefits, or work environment" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">
                                <Star className="mr-2 h-4 w-4" />
                                Find Top-Rated Companies
                            </Button>
                            <Button variant="outline" className="bg-background cursor-pointer border-orange-500 text-orange-500">
                                <Search className="mr-2 h-4 w-4" />
                                Search All Companies
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
