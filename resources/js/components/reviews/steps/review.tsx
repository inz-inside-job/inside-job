import StarRating from '@/components/star-rating';
import { Label } from '@/components/ui/label';
import { ReviewFormInterface } from '../review-modal';

interface ReviewStepProps {
    data: ReviewFormInterface;
    setData: (key: keyof ReviewFormInterface, value: number) => void;
    errors: Partial<Record<keyof ReviewFormInterface, string>>;
}

export default function ReviewStep({ data, setData }: ReviewStepProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="work-life-balance">Work-Life Balance</Label>
                    <div className="flex items-center justify-between">
                        <StarRating rating={data['work_life_balance']} onRatingChange={(rating: number) => setData('work_life_balance', rating)} />
                        <span className="font-medium">{data['work_life_balance']}/5</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="culture-values">Culture & Values</Label>
                    <div className="flex items-center justify-between">
                        <StarRating rating={data['culture_values']} onRatingChange={(rating: number) => setData('culture_values', rating)} />
                        <span className="font-medium">{data['culture_values']}/5</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="career-opportunities">Career Opportunities</Label>
                    <div className="flex items-center justify-between">
                        <StarRating
                            rating={data['career_opportunities']}
                            onRatingChange={(rating: number) => setData('career_opportunities', rating)}
                        />
                        <span className="font-medium">{data['career_opportunities']}/5</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="compensation-benefits">Compensation & Benefits</Label>
                    <div className="flex items-center justify-between">
                        <StarRating
                            rating={data['compensation_benefits']}
                            onRatingChange={(rating: number) => setData('compensation_benefits', rating)}
                        />
                        <span className="font-medium">{data['compensation_benefits']}/5</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="senior-management">Senior Management</Label>
                    <div className="flex items-center justify-between">
                        <StarRating rating={data['senior_management']} onRatingChange={(rating: number) => setData('senior_management', rating)} />
                        <span className="font-medium">{data['senior_management']}/5</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
