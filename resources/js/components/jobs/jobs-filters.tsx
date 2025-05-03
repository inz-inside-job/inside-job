import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useGetQueryParams, withQueryBuilderParams } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useCallback, useState } from 'react';

const jobTypes: App.Enums.EmploymentType[] = ['Full Time', 'Part Time', 'Contract', 'Temporary', 'Internship', 'Remote'];
const experienceLevels: App.Enums.EmploymentExperience[] = ['Entry Level', 'Mid Level', 'Senior Level', 'Manager', 'Director', 'Executive'];
const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Media', 'Consulting', 'Non-profit', 'Government'];

export function JobFilters() {
    const queryParams = useGetQueryParams<{
        salary: number;
        posted_in: string;
        employment_type: App.Enums.EmploymentType[];
        employment_experience: App.Enums.EmploymentExperience[];
        'company.industry': string[];
        posted_before: string;
        location: string;
    }>();

    const [minSalary, setMinSalary] = useState(queryParams.filters.salary ? [queryParams.filters.salary / 1000] : [50]);
    const [datePosted, setDatePosted] = useState(queryParams.filters.posted_in ?? 'any');
    const [selectedJobTypes, setSelectedJobTypes] = useState(queryParams.filters.employment_type ?? []);
    const [selectedExperienceLevels, setSelectedExperienceLevels] = useState(queryParams.filters.employment_experience ?? []);
    const [selectedIndustries, setSelectedIndustries] = useState(queryParams.filters['company.industry'] ?? []);
    const [location, setLocation] = useState(queryParams.filters.location ?? '');

    const resetFilters = () => {
        setMinSalary([50]);
        setDatePosted('any');
        setSelectedJobTypes([]);
        setSelectedExperienceLevels([]);
        setSelectedIndustries([]);
        setLocation('');
    };

    const toggleJobType = (type: App.Enums.EmploymentType) => {
        setSelectedJobTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]));
    };
    const toggleExperienceLevel = (level: App.Enums.EmploymentExperience) => {
        setSelectedExperienceLevels((prev) => (prev.includes(level) ? prev.filter((item) => item !== level) : [...prev, level]));
    };

    const toggleIndustry = (industry: string) => {
        setSelectedIndustries((prev) => (prev.includes(industry) ? prev.filter((item) => item !== industry) : [...prev, industry]));
    };

    const onApply = useCallback(() => {
        const posted_in = datePosted === 'any' ? null : datePosted;
        const salary = minSalary[0] === 50 ? null : minSalary[0] * 1000;

        const query = withQueryBuilderParams({
            ...queryParams,
            filters: {
                salary,
                posted_in,
                employment_type: selectedJobTypes,
                employment_experience: selectedExperienceLevels,
                'company.industry': selectedIndustries,
                location,
            },
            cursor: undefined,
        });

        router.get(route('jobs'), query, {
            only: ['jobs', 'next_cursor'],
            reset: ['jobs'],
            preserveState: true,
            preserveScroll: true,
        });
    }, [datePosted, location, minSalary, queryParams, selectedExperienceLevels, selectedIndustries, selectedJobTypes]);

    return (
        <div className="bg-background sticky top-20 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="cursor-pointer text-orange-500 hover:text-orange-600" onClick={resetFilters}>
                    Reset
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={['jobType']}>
                <AccordionItem value="datePosted">
                    <AccordionTrigger className={'cursor-pointer'}>Date Posted</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <div className="flex cursor-pointer items-center space-x-2">
                                <Checkbox id="date-any" checked={datePosted === 'any'} onCheckedChange={() => setDatePosted('any')} />
                                <label htmlFor="date-any" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Any time
                                </label>
                            </div>
                            <div className="flex cursor-pointer items-center space-x-2">
                                <Checkbox id="date-day" checked={datePosted === '1 day ago'} onCheckedChange={() => setDatePosted('1 day ago')} />
                                <label htmlFor="date-day" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Past 24 hours
                                </label>
                            </div>
                            <div className="flex cursor-pointer items-center space-x-2">
                                <Checkbox id="date-week" checked={datePosted === '1 week ago'} onCheckedChange={() => setDatePosted('1 week ago')} />
                                <label htmlFor="date-week" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Past week
                                </label>
                            </div>
                            <div className="flex cursor-pointer items-center space-x-2">
                                <Checkbox
                                    id="date-month"
                                    checked={datePosted === '1 month ago'}
                                    onCheckedChange={() => setDatePosted('1 month ago')}
                                />
                                <label
                                    htmlFor="date-month"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Past month
                                </label>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="jobType">
                    <AccordionTrigger className={'cursor-pointer'}>Job Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {jobTypes.map((type) => (
                                <div key={type} className="flex cursor-pointer items-center space-x-2">
                                    <Checkbox
                                        className={'cursor-pointer'}
                                        id={`type-${type}`}
                                        checked={selectedJobTypes.includes(type)}
                                        onCheckedChange={() => toggleJobType(type)}
                                    />
                                    <label
                                        htmlFor={`type-${type}`}
                                        className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="salary">
                    <AccordionTrigger className={'cursor-pointer'}>Salary Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{minSalary[0]}K+€</span>
                                <span className="text-xs text-gray-500">per year</span>
                            </div>
                            <Slider defaultValue={[50]} max={300} min={0} step={10} value={minSalary} onValueChange={setMinSalary} />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>0€</span>
                                <span>300K€</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="experience">
                    <AccordionTrigger className={'cursor-pointer'}>Experience Level</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {experienceLevels.map((level) => (
                                <div key={level} className="flex cursor-pointer items-center space-x-2">
                                    <Checkbox
                                        className={'cursor-pointer'}
                                        id={`level-${level}`}
                                        checked={selectedExperienceLevels.includes(level)}
                                        onCheckedChange={() => toggleExperienceLevel(level)}
                                    />
                                    <label
                                        htmlFor={`level-${level}`}
                                        className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {level}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="industry">
                    <AccordionTrigger className={'cursor-pointer'}>Industry</AccordionTrigger>
                    <AccordionContent>
                        <div className="max-h-60 space-y-2 overflow-y-auto pr-2">
                            {industries.map((industry) => (
                                <div key={industry} className="flex cursor-pointer items-center space-x-2">
                                    <Checkbox
                                        className={'cursor-pointer'}
                                        id={`industry-${industry}`}
                                        checked={selectedIndustries.includes(industry)}
                                        onCheckedChange={() => toggleIndustry(industry)}
                                    />
                                    <label
                                        htmlFor={`industry-${industry}`}
                                        className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {industry}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="location">
                    <AccordionTrigger className={'cursor-pointer'}>Location</AccordionTrigger>
                    <AccordionContent>
                        <Input
                            placeholder="City, state, or zip code"
                            className="mb-3"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button onClick={onApply} className="mt-6 w-full cursor-pointer bg-orange-500 hover:bg-orange-600">
                Apply Filters
            </Button>
        </div>
    );
}
