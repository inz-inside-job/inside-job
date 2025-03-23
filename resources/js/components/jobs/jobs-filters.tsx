import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'];

const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Manager', 'Director', 'Executive'];

const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Media', 'Consulting', 'Non-profit', 'Government'];

export function JobFilters() {
    const [salaryRange, setSalaryRange] = useState([50]);
    const [datePosted, setDatePosted] = useState('any');
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
    const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [location, setLocation] = useState('');
    const [isRemoteOnly, setIsRemoteOnly] = useState(false);
    const [isHybrid, setIsHybrid] = useState(false);
    const [isOnSite, setIsOnSite] = useState(false);

    const defaultSalaryRange = [50];
    const defaultDatePosted = 'any';

    const resetFilters = () => {
        setSalaryRange(defaultSalaryRange);
        setDatePosted(defaultDatePosted);
        setSelectedJobTypes([]);
        setSelectedExperienceLevels([]);
        setSelectedIndustries([]);
        setLocation('');
        setIsRemoteOnly(false);
        setIsHybrid(false);
        setIsOnSite(false);
    };

    const toggleJobType = (type: string) => {
        setSelectedJobTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]));
    };
    const toggleExperienceLevel = (level: string) => {
        setSelectedExperienceLevels((prev) => (prev.includes(level) ? prev.filter((item) => item !== level) : [...prev, level]));
    };

    const toggleIndustry = (industry: string) => {
        setSelectedIndustries((prev) => (prev.includes(industry) ? prev.filter((item) => item !== industry) : [...prev, industry]));
    };

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
                    <AccordionTrigger>Date Posted</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="date-any" checked={datePosted === 'any'} onCheckedChange={() => setDatePosted('any')} />
                                <label htmlFor="date-any" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Any time
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="date-day" checked={datePosted === 'day'} onCheckedChange={() => setDatePosted('day')} />
                                <label htmlFor="date-day" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Past 24 hours
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="date-week" checked={datePosted === 'week'} onCheckedChange={() => setDatePosted('week')} />
                                <label htmlFor="date-week" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Past week
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="date-month" checked={datePosted === 'month'} onCheckedChange={() => setDatePosted('month')} />
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
                    <AccordionTrigger>Job Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {jobTypes.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`type-${type}`}
                                        checked={selectedJobTypes.includes(type)}
                                        onCheckedChange={() => toggleJobType(type)}
                                    />
                                    <label
                                        htmlFor={`type-${type}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="salary">
                    <AccordionTrigger>Salary Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">${salaryRange[0]}K+</span>
                                <span className="text-xs text-gray-500">per year</span>
                            </div>
                            <Slider defaultValue={[50]} max={200} min={0} step={10} value={salaryRange} onValueChange={setSalaryRange} />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>$0</span>
                                <span>$200K+</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="experience">
                    <AccordionTrigger>Experience Level</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {experienceLevels.map((level) => (
                                <div key={level} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`level-${level}`}
                                        checked={selectedExperienceLevels.includes(level)}
                                        onCheckedChange={() => toggleExperienceLevel(level)}
                                    />
                                    <label
                                        htmlFor={`level-${level}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {level}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="industry">
                    <AccordionTrigger>Industry</AccordionTrigger>
                    <AccordionContent>
                        <div className="max-h-60 space-y-2 overflow-y-auto pr-2">
                            {industries.map((industry) => (
                                <div key={industry} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`industry-${industry}`}
                                        checked={selectedIndustries.includes(industry)}
                                        onCheckedChange={() => toggleIndustry(industry)}
                                    />
                                    <label
                                        htmlFor={`industry-${industry}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {industry}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="location">
                    <AccordionTrigger>Location</AccordionTrigger>
                    <AccordionContent>
                        <Input
                            placeholder="City, state, or zip code"
                            className="mb-3"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remote-only" checked={isRemoteOnly} onCheckedChange={(checked) => setIsRemoteOnly(checked === true)} />
                                <label
                                    htmlFor="remote-only"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remote only
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="hybrid" checked={isHybrid} onCheckedChange={(checked) => setIsHybrid(checked === true)} />
                                <label htmlFor="hybrid" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Hybrid
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="on-site" checked={isOnSite} onCheckedChange={(checked) => setIsOnSite(checked === true)} />
                                <label htmlFor="on-site" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    On-site
                                </label>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button className="mt-6 w-full cursor-pointer bg-orange-500 hover:bg-orange-600">Apply Filters</Button>
        </div>
    );
}
