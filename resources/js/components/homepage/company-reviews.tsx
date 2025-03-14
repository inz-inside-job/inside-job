import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
    {
        id: 4,
        company: 'GrowthLabs',
        logo: '/placeholder.svg?height=60&width=60',
        rating: 3.8,
        reviewCount: 421,
        review: 'Fast-paced environment with good learning opportunities. Diverse clients and interesting projects.',
        position: 'Marketing Specialist',
        reviewer: {
            name: 'Jordan K.',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        pros: 'Diverse projects, good team culture',
        cons: 'Work-life balance could be better',
    },
    {
        id: 5,
        company: 'FinTech Solutions',
        logo: '/placeholder.svg?height=60&width=60',
        rating: 4.3,
        reviewCount: 687,
        review: 'Excellent compensation with strong work ethic. Challenging work with smart colleagues.',
        position: 'Financial Analyst',
        reviewer: {
            name: 'Morgan P.',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        pros: 'Great pay, challenging work',
        cons: 'High pressure environment',
    },
];

export function CompanyReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(3);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Update visible items based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleItems(1);
            } else if (window.innerWidth < 1024) {
                setVisibleItems(2);
            } else {
                setVisibleItems(3);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = companyReviews.length - visibleItems;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold md:text-3xl">Company Reviews</h2>
                </div>

                <div className="relative">
                    {/* Carousel Navigation Buttons */}
                    <div className="absolute top-1/2 -left-4 z-10 -translate-y-1/2">
                        <Button variant="outline" size="icon" className="bg-background rounded-full shadow-md" onClick={prevSlide}>
                            <ChevronLeft className="h-5 w-5" />
                            <span className="sr-only">Previous</span>
                        </Button>
                    </div>

                    <div className="absolute top-1/2 -right-4 z-10 -translate-y-1/2">
                        <Button variant="outline" size="icon" className="bg-background rounded-full shadow-md" onClick={nextSlide}>
                            <ChevronRight className="h-5 w-5" />
                            <span className="sr-only">Next</span>
                        </Button>
                    </div>

                    {/* Carousel Container */}
                    <div ref={carouselRef} className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
                        >
                            {companyReviews.map((review) => (
                                <div key={review.id} className={`flex-shrink-0 px-3`} style={{ width: `${100 / visibleItems}%` }}>
                                    <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
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
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="mt-6 flex justify-center gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
