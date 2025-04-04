import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PositionStepProps {
    position: string;
    setPosition: (position: string) => void;
}

export default function PositionStep({ position, setPosition }: PositionStepProps) {
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
            />
        </div>
    );
}
