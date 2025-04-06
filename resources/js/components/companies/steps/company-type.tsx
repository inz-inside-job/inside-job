import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubmitCompanyInterface } from '../submit-company-button';

interface CompanyTypeStepProps {
    data: SubmitCompanyInterface;
    setData: (key: keyof SubmitCompanyInterface, value: string) => void;
    errors: Partial<Record<keyof SubmitCompanyInterface, string>>;
}

export default function CompanyTypeStep({ data, setData, errors }: CompanyTypeStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="type" className="text-base font-medium">
                    Company Type
                </Label>
                <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="Non-profit">Non-Profit</SelectItem>
                    </SelectContent>
                </Select>

                {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
            </div>
        </div>
    );
}
