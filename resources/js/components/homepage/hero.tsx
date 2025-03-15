import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, MapPin, Search } from 'lucide-react';

export function Hero() {
    return (
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="mx-auto mb-8 max-w-3xl text-center">
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Find your dream job</h1>
                    <p className="text-lg opacity-90 md:text-xl">
                        Search millions of jobs and get the inside scoop on companies with employee reviews.
                    </p>
                </div>

                <div className="bg-background mx-auto max-w-3xl rounded-lg p-4 shadow-lg">
                    <Tabs defaultValue="jobs">
                        <TabsList className="bg-muted mb-4 flex w-full justify-between">
                            <TabsTrigger value="jobs" className="flex-1 cursor-pointer">
                                Jobs
                            </TabsTrigger>
                            <TabsTrigger value="companies" className="flex-1 cursor-pointer">
                                Companies
                            </TabsTrigger>
                            <TabsTrigger value="salaries" className="flex-1 cursor-pointer">
                                Salaries
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="jobs" className="space-y-4">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input className="pl-10" placeholder="Job title, keywords" />
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input className="pl-10" placeholder="City, state, or zip code" />
                                </div>
                                <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">Search Jobs</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="companies" className="space-y-4">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div className="relative md:col-span-2">
                                    <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input className="pl-10" placeholder="Company name" />
                                </div>
                                <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">Search Companies</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="salaries" className="space-y-4">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input className="pl-10" placeholder="Job title" />
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input className="pl-10" placeholder="Location" />
                                </div>
                                <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">Search Salaries</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
