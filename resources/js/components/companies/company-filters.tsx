import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useGetQueryParams, withQueryBuilderParams } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useCallback, useState } from 'react';

const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Media', 'Consulting', 'Non-profit', 'Government'];

const companySize = [
    { min: null, max: 50, label: '1-50 employees' },
    { min: 51, max: 200, label: '51-200 employees' },
    { min: 201, max: 500, label: '201-500 employees' },
    { min: 501, max: 1000, label: '501-1,000 employees' },
    { min: 1001, max: 5000, label: '1,001-5,000 employees' },
    { min: 5001, max: null, label: '5,001+ employees' },
];

const defaultRatingFilter = [3.5];

export function CompanyFilters() {
    const queryParams = useGetQueryParams<{
        min_rating: number;
        industry: string[];
        company_sizes: [number, number][];
        location: string;
    }>();

    const queryCompanySizes = (queryParams.filters.company_sizes ?? [])
        .map(([min, max]) => {
            return companySize.find((item) => item.min === min && item.max === max);
        })
        .filter((item) => item !== undefined);

    const [ratingFilter, setRatingFilter] = useState<number[]>([queryParams.filters.min_rating ?? defaultRatingFilter[0]]);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([...(queryParams.filters.industry ?? [])]);
    const [selectedCompanySizes, setSelectedCompanySizes] = useState<(typeof companySize)[0][]>(queryCompanySizes);
    const [location, setLocation] = useState(queryParams.filters.location ?? '');

    const resetFilters = () => {
        setRatingFilter(defaultRatingFilter);
        setSelectedIndustries([]);
        setSelectedCompanySizes([]);
        setLocation('');
    };

    const toggleIndustry = (industry: string) => {
        setSelectedIndustries((prev) => (prev.includes(industry) ? prev.filter((item) => item !== industry) : [...prev, industry]));
    };

    const toggleCompanySize = (size: (typeof companySize)[0]) => {
        setSelectedCompanySizes((prev) => {
            const isSelected = prev.some((item) => item.min === size.min && item.max === size.max);
            return isSelected ? prev.filter((item) => !(item.min === size.min && item.max === size.max)) : [...prev, size];
        });
    };

    const onApply = useCallback(() => {
        const minRating = ratingFilter[0] === defaultRatingFilter[0] ? undefined : ratingFilter[0];
        const companySizes = selectedCompanySizes.map((size) => `${size.min ?? 'null'},${size.max ?? 'null'}`);
        const locationParam = location.trim();

        const query = withQueryBuilderParams({
            ...queryParams,
            filters: {
                min_rating: minRating,
                industry: selectedIndustries,
                company_sizes: companySizes,
                location: locationParam === '' ? undefined : locationParam,
            },
            cursor: undefined,
        });

        router.get(route('companies'), query, {
            only: ['companies', 'next_cursor'],
            reset: ['companies'],
            preserveState: true,
            preserveScroll: true,
        });
    }, [location, queryParams, ratingFilter, selectedCompanySizes, selectedIndustries]);

    return (
        <div className="bg-background sticky top-20 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="cursor-pointer text-orange-500 hover:text-orange-600" onClick={resetFilters}>
                    Reset
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={['rating']}>
                <AccordionItem value="rating">
                    <AccordionTrigger className={'cursor-pointer'}>Overall Rating</AccordionTrigger>
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

                <AccordionItem value="industry">
                    <AccordionTrigger className={'cursor-pointer'}>Industry</AccordionTrigger>
                    <AccordionContent>
                        <div className="max-h-60 space-y-3 overflow-y-auto pr-2">
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

                <AccordionItem value="size">
                    <AccordionTrigger className={'cursor-pointer'}>Company Size</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            {companySize.map((size) => (
                                <div key={size.label} className="flex cursor-pointer items-center space-x-2">
                                    <Checkbox
                                        className={'cursor-pointer'}
                                        id={`size-${size.label}`}
                                        checked={selectedCompanySizes.some((item) => item.min === size.min && item.max === size.max)}
                                        onCheckedChange={() => toggleCompanySize(size)}
                                    />
                                    <label
                                        htmlFor={`size-${size.label}`}
                                        className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {size.label}
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
