import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { JobFormInterface } from '../job-application-form';

interface PersonalInfoStepProps {
    first_name: string;
    last_name: string;
    phone: string;
    linkedin: string | null;
    portfolio: string | null;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setPhone: (phone: string) => void;
    setLinkedin: (linkedin: string | null) => void;
    setPortfolio: (porfolio: string | null) => void;
    errors: Partial<Record<keyof JobFormInterface, string>>;
    validate: (field: keyof JobFormInterface) => void;
}

export default function PersonalInfoStep({
    first_name,
    setFirstName,
    last_name,
    setLastName,
    phone,
    setPhone,
    linkedin,
    setLinkedin,
    portfolio,
    setPortfolio,
    errors,
    validate,
}: PersonalInfoStepProps) {
    return (
        <div className="space-y-4">
            <Label htmlFor="first_name" className="text-base font-medium">
                First Name
            </Label>
            <Input
                id="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
                className="mt-1"
                onBlur={() => validate('first_name')}
            />
            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}

            <Label htmlFor="last_name" className="text-base font-medium">
                Last Name
            </Label>
            <Input
                id="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
                className="mt-1"
                onBlur={() => validate('last_name')}
            />
            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}

            <Label htmlFor="phone" className="text-base font-medium">
                Phone number
            </Label>
            <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="mt-1"
                onBlur={() => validate('phone')}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

            <Label htmlFor="linkedin" className="text-base font-medium">
                LinkedIn Profile (Optional)
            </Label>
            <Input
                id="linkedin"
                value={linkedin || ''}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://www.linkedin.com/in/your-profile"
                className="mt-1"
                onBlur={() => validate('linkedin')}
            />
            {errors.linkedin && <p className="text-sm text-red-500">{errors.linkedin}</p>}

            <Label htmlFor="portfolio" className="text-base font-medium">
                Portfolio/Website (Optional)
            </Label>
            <Input
                id="portfolio"
                value={portfolio || ''}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://your-website"
                className="mt-1"
                onBlur={() => validate('portfolio')}
            />
            {errors.portfolio && <p className="text-sm text-red-500">{errors.portfolio}</p>}
        </div>
    );
}
