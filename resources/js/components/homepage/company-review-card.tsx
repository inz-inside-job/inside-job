import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

type Review = {
    id: number;
    company: string;
    logo: string;
    rating: number;
    reviewCount: number;
    review: string;
    position: string;
    reviewer: {
        name: string;
        avatar: string;
    };
    pros: string;
    cons: string;
};

export function CompanyReviewCard({ review }: { review: Review }) {
    return (
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={review.logo} alt={''} />
                            <AvatarFallback>{review.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">{review.company}</h3>
                            <div className="flex items-center">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-1 text-sm">{review.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 text-xs text-gray-500">{review.reviewCount} reviews</div>
                </div>

                <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-600 italic">"{review.review}"</p>
                    <div className="text-xs text-gray-500">{review.position}</div>
                </div>

                <div className="mb-4 border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-1 text-xs font-semibold text-gray-500">Pros</div>
                            <p className="text-xs">{review.pros}</p>
                        </div>
                        <div>
                            <div className="mb-1 text-xs font-semibold text-gray-500">Cons</div>
                            <p className="text-xs">{review.cons}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
                        <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{review.reviewer.name}</span>
                </div>
            </CardContent>
        </Card>
    );
}
