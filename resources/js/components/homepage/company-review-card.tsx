import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export function CompanyReviewCard({
    company,
    review,
}: {
    company: App.Data.Company.CompanyData | App.Data.Home.ReviewCompanyData;
    review: App.Data.Company.CompanyReviewData;
}) {
    return (
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={company.logo ?? ''} alt={company.name} />
                            <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">{company.name}</h3>
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
                </div>

                <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-600 italic">"{review.review}"</p>
                    <div className="text-xs text-gray-500">{review.position}</div>
                </div>

                <div className="mb-4 border-t pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-1 text-xs font-semibold text-gray-500">Pros</div>
                            <ul className="list-inside list-disc">
                                {review.pros.map((pro, i) => (
                                    <li key={i} className="text-xs">
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="mb-1 text-xs font-semibold text-gray-500">Cons</div>
                            <ul className="list-inside list-disc">
                                {review.cons.map((con, i) => (
                                    <li key={i} className="text-xs">
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage src={''} alt={review.user.name} />
                        <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{review.user.name}</span>
                </div>
            </CardContent>
        </Card>
    );
}
