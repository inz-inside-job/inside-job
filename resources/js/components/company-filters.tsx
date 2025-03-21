import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { useState } from 'react';

const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Media', 'Consulting', 'Non-profit', 'Government'];

const companySize = ['1-50 employees', '51-200 employees', '201-500 employees', '501-1,000 employees', '1,001-5,000 employees', '5,001+ employees'];

const reviewCategories = [
    'Work-Life Balance',
    'Culture & Values',
    'Diversity & Inclusion',
    'Career Opportunities',
    'Compensation & Benefits',
    'Senior Management',
    'CEO Approval',
];

export function CompanyFilters() {
    const [ratingFilter, setRatingFilter] = useState([3.5]);
    const [selectedReviewCategories, setSelectedReviewCategories] = useState<string[]>([]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedCompanySizes, setSelectedCompanySizes] = useState<string[]>([]);
    const [location, setLocation] = useState('');
    const [isRemoteFriendly, setIsRemoteFriendly] = useState(false);
    const [isHybrid, setIsHybrid] = useState(false);

    const defaultRatingFilter = [3.5];

    const resetFilters = () => {
        setRatingFilter(defaultRatingFilter);
        setSelectedReviewCategories([]);
        setSelectedIndustries([]);
        setSelectedCompanySizes([]);
        setLocation('');
        setIsRemoteFriendly(false);
        setIsHybrid(false);
    };

    const toggleReviewCategory = (category: string) => {
        setSelectedReviewCategories((prev) => (prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]));
    };

    const toggleIndustry = (industry: string) => {
        setSelectedIndustries((prev) => (prev.includes(industry) ? prev.filter((item) => item !== industry) : [...prev, industry]));
    };

    const toggleCompanySize = (size: string) => {
        setSelectedCompanySizes((prev) => (prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]));
    };

    return (
        <div className="bg-background sticky top-20 rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="cursor-pointer text-orange-500 hover:text-orange-600" onClick={resetFilters}>
                    Reset
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={['rating', 'reviewCategories', 'industry', 'size']}>
                <AccordionItem value="rating">
                    <AccordionTrigger>Overall Rating</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium">{ratingFilter[0]}+</span>
                                </div>
                                <span className="text-xs text-gray-500">Minimum rating</span>
                            </div>
                            <Slider defaultValue={[3.5]} max={5} min={0} step={0.5} value={ratingFilter} onValueChange={setRatingFilter} />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>0</span>
                                <span>5</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reviewCategories">
                    <AccordionTrigger>Review Categories</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            {reviewCategories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`category-${category}`}
                                        checked={selectedReviewCategories.includes(category)}
                                        onCheckedChange={() => toggleReviewCategory(category)}
                                    />
                                    <label
                                        htmlFor={`category-${category}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="industry">
                    <AccordionTrigger>Industry</AccordionTrigger>
                    <AccordionContent>
                        <div className="max-h-60 space-y-3 overflow-y-auto pr-2">
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

                <AccordionItem value="size">
                    <AccordionTrigger>Company Size</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            {companySize.map((size) => (
                                <div key={size} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`size-${size}`}
                                        checked={selectedCompanySizes.includes(size)}
                                        onCheckedChange={() => toggleCompanySize(size)}
                                    />
                                    <label
                                        htmlFor={`size-${size}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {size}
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
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remote-friendly"
                                    checked={isRemoteFriendly}
                                    onCheckedChange={(checked) => setIsRemoteFriendly(checked === true)}
                                />
                                <label
                                    htmlFor="remote-friendly"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remote-friendly
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="hybrid" checked={isHybrid} onCheckedChange={(checked) => setIsHybrid(checked === true)} />
                                <label htmlFor="hybrid" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Hybrid
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
