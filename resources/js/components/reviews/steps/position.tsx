import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReviewFormInterface } from '../review-modal';

interface PositionStepProps {
    position: string;
    setPosition: (position: string) => void;
    errors: Partial<Record<keyof ReviewFormInterface, string>>;
    validate: (field: keyof ReviewFormInterface) => void;
}

export default function PositionStep({ position, setPosition, errors, validate }: PositionStepProps) {
    return (
        <div className="space-y-4">
            <Label htmlFor="position" className="text-base font-medium">
                Your Position
            </Label>
            <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g. Software Engineer"
                required
                className="mt-1"
                onBlur={() => validate('position')}
            />
            {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
        </div>
    );
}
