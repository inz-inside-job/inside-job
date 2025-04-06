import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { SubmitCompanyInterface } from '../submit-company-button';

interface DetailsStepProps {
    data: SubmitCompanyInterface;
    setData: (key: keyof SubmitCompanyInterface, value: string | Date | number) => void;
    errors: Partial<Record<keyof SubmitCompanyInterface, string>>;
}

export default function CompanyDetailsStep({ data, setData, errors }: DetailsStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="description" className="text-base font-medium">
                    Description
                </Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Describe the company..."
                    className="focus:ring-primary h-32 w-full rounded-md border p-2 focus:ring focus:outline-none"
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            <div>
                <Label htmlFor="employeeCount" className="text-base font-medium">
                    Employee Count
                </Label>
                <Input
                    type="number"
                    id="employeeCount"
                    value={data.employee_count}
                    onChange={(e) => setData('employee_count', Number(e.target.value))}
                    className="mt-1"
                    placeholder="e.g. 1000"
                />
                {errors.employee_count && <p className="mt-1 text-sm text-red-500">{errors.employee_count}</p>}
            </div>

            <div className="flex flex-col">
                <Label htmlFor="foundedYear" className="text-base font-medium">
                    Founded Year
                </Label>
                <Popover modal>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={clsx('w-[240px] justify-start text-left font-normal', { 'text-muted-foreground': !data['founded_year'] })}
                        >
                            <CalendarIcon />
                            {data['founded_year'] ? format(data['founded_year'], 'PPP') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={data['founded_year']} onSelect={(e) => setData('founded_year', e as Date)} initialFocus />
                    </PopoverContent>
                </Popover>
                {errors.founded_year && <p className="mt-1 text-sm text-red-500">{errors.founded_year}</p>}
            </div>
        </div>
    );
}
