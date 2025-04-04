import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, X } from 'lucide-react';
import { ReviewFormInterface } from '../review-modal';

interface ProsConsStepProps {
    data: { pros: string[]; cons: string[] };
    setData: (key: keyof ReviewFormInterface, value: string[]) => void;
    errors: Partial<Record<keyof ReviewFormInterface, string>>;
    validate: (field: keyof ReviewFormInterface) => void;
}

export default function ProsConsStep({ data, setData, errors, validate }: ProsConsStepProps) {
    const addPro = () => {
        setData('pros', [...data.pros, '']);
    };

    const addCon = () => {
        setData('cons', [...data.cons, '']);
    };

    const updatePro = (index: number, value: string) => {
        const newPros = [...data['pros']];
        newPros[index] = value;
        setData('pros', newPros);
    };

    const updateCon = (index: number, value: string) => {
        const newCons = [...data['cons']];
        newCons[index] = value;
        setData('cons', newCons);
    };

    const removePro = (index: number) => {
        const newPros = [...data['pros']];
        newPros.splice(index, 1);
        setData('pros', newPros.length ? newPros : ['']);
    };

    const removeCon = (index: number) => {
        const newCons = [...data['cons']];
        newCons.splice(index, 1);
        setData('cons', newCons.length ? newCons : ['']);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4">
                <Label className="text-base font-medium">Pros</Label>
                {data['pros'].map((pro, index) => (
                    <div key={`pro-${index}`} className="flex items-center gap-2">
                        <Input
                            value={pro}
                            onChange={(e) => updatePro(index, e.target.value)}
                            placeholder="What did you like about working here?"
                            className="flex-1"
                            onBlur={() => validate('pros')}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removePro(index)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addPro} className="mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Pro
                </Button>
                {errors.pros && <p className="text-sm text-red-500">{errors.pros}</p>}
            </div>

            <div className="flex flex-col space-y-4">
                <Label className="text-base font-medium">Cons</Label>
                {data['cons'].map((con, index) => (
                    <div key={`con-${index}`} className="flex items-center gap-2">
                        <Input
                            value={con}
                            onChange={(e) => updateCon(index, e.target.value)}
                            placeholder="What didn't you like about working here?"
                            className="flex-1"
                            onBlur={() => validate('cons')}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeCon(index)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addCon} className="mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Con
                </Button>
                {errors.cons && <p className="text-sm text-red-500">{errors.cons}</p>}
            </div>
        </div>
    );
}
