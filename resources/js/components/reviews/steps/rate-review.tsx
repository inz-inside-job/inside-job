import StarRating from '@/components/star-rating';
import { Label } from '@/components/ui/label';
import { ReviewFormInterface } from '../review-modal';

interface RateAndReviewStepProps {
    rating: number;
    review: string;
    setRating: (rating: number) => void;
    setReview: (review: string) => void;
    errors: Partial<Record<keyof ReviewFormInterface, string>>;
    validate: (field: keyof ReviewFormInterface) => void;
}

export default function RateAndReviewStep({ rating, review, setRating, setReview, errors, validate }: RateAndReviewStepProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="review" className={'text-base font-medium'}>
                        Review
                    </Label>
                    <textarea
                        id="review"
                        value={review}
                        maxLength={1000}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                        className="focus:ring-primary h-32 w-full rounded-md border p-2 focus:ring focus:outline-none"
                        onBlur={() => validate('review')}
                    />
                    {errors.review && <p className="text-sm text-red-500">{errors.review}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="compensation-benefits" className={'text-base font-medium'}>
                    Overall rating
                </Label>
                <div className="flex items-center justify-center gap-2">
                    <StarRating rating={rating} onRatingChange={setRating} size={'lg'} />
                    <span className="font-medium">{rating}/5</span>
                    {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                </div>
            </div>
        </div>
    );
}
