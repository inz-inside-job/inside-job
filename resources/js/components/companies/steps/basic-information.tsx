import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitCompanyInterface } from '../submit-company-button';

interface BasicInformationStepProps {
    data: SubmitCompanyInterface;
    setData: (key: keyof SubmitCompanyInterface, value: string) => void;
    errors: Partial<Record<keyof SubmitCompanyInterface, string>>;
}

export default function BasicInformationStep({ data, setData, errors }: BasicInformationStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="name" className="text-base font-medium">
                    Company Name
                </Label>
                <Input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1"
                    placeholder="e.g. Tech Corp"
                />

                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
                <Label htmlFor="industry" className="text-base font-medium">
                    Industry
                </Label>
                <Input
                    type="text"
                    id="industry"
                    value={data.industry}
                    onChange={(e) => setData('industry', e.target.value)}
                    className={'mt-1'}
                    placeholder="e.g. Technology"
                />
                {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry}</p>}
            </div>

            <div>
                <Label htmlFor="ceo" className="text-base font-medium">
                    CEO Name
                </Label>
                <Input
                    type="text"
                    id="ceo"
                    value={data.ceo}
                    onChange={(e) => setData('ceo', e.target.value)}
                    className={'mt-1'}
                    placeholder="e.g. John Doe"
                />

                {errors.ceo && <p className="mt-1 text-sm text-red-500">{errors.ceo}</p>}
            </div>
        </div>
    );
}
