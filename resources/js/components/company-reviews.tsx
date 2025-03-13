import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

// placeholder data
const companyReviews = [
    {
        id: 1,
        company: 'TechCorp',
        logo: '/placeholder.svg?height=60&width=60',
        rating: 4.2,
        reviewCount: 1243,
        review: 'Great work-life balance and competitive pay. Management is supportive and there are plenty of growth opportunities.',
        position: 'Software Engineer',
        reviewer: {
            name: 'Alex M.',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        pros: 'Good benefits, flexible hours',
        cons: 'Some projects can be stressful',
    },
    {
        id: 2,
        company: 'InnovateCo',
        logo: '/placeholder.svg?height=60&width=60',
        rating: 4.5,
        reviewCount: 876,
        review: 'Innovative company with a strong focus on employee development. The culture is collaborative and inclusive.',
        position: 'Product Manager',
        reviewer: {
            name: 'Jamie L.',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        pros: 'Great culture, good compensation',
        cons: 'Work can be demanding at times',
    },
    {
        id: 3,
        company: 'DesignHub',
        logo: '/placeholder.svg?height=60&width=60',
        rating: 4.0,
        reviewCount: 542,
        review: 'Creative environment with talented designers. Projects are interesting but deadlines can be tight.',
        position: 'UX Designer',
        reviewer: {
            name: 'Taylor R.',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        pros: 'Creative freedom, modern office',
        cons: 'Tight deadlines, occasional overtime',
    },
];

export function CompanyReviews() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold md:text-3xl">Company Reviews</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {companyReviews.map((review) => (
                        <Card key={review.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={review.logo || '/placeholder.svg'} alt={''} className="h-12 w-12 rounded-md border" />
                                        <div>
                                            <h3 className="font-semibold">{review.company}</h3>
                                            <div className="flex items-center">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
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
                    ))}
                </div>
            </div>
        </section>
    );
}
