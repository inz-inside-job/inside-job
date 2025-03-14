import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useMediaQuery } from '@/hooks/use-media-query';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CompanyReviewCard } from './company-review-card';

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
    const [api, setApi] = useState<CarouselApi>();
    const [count, setCount] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState<number[]>([]);

    const isDesktop = useMediaQuery('(min-width: 1280px)');
    const isTablet = useMediaQuery('(min-width: 768px)');

    const getVisibleSlidesCount = useCallback(() => {
        if (isDesktop) return 3;
        if (isTablet) return 2;
        return 1;
    }, [isDesktop, isTablet]);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);

        const updateVisibleSlides = () => {
            const currentIndex = api.selectedScrollSnap();

            const visibleCount = getVisibleSlidesCount();
            const newVisibleSlides = [];

            for (let i = 0; i < visibleCount; i++) {
                const slideIndex = (currentIndex + i) % count;
                newVisibleSlides.push(slideIndex);
            }

            setVisibleSlides(newVisibleSlides);
        };

        updateVisibleSlides();
        api.on('select', updateVisibleSlides);
        api.on('resize', updateVisibleSlides);

        return () => {
            api.off('select', updateVisibleSlides);
            api.off('resize', updateVisibleSlides);
        };
    }, [api, count, getVisibleSlidesCount]);

    const handleDotClick = useCallback(
        (index: number) => {
            if (!api) return;
            api.scrollTo(index);
        },
        [api],
    );

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold md:text-3xl">Company Reviews</h2>
                </div>

                <div className="relative">
                    <Carousel
                        plugins={[Autoplay({ delay: 8000 })]}
                        setApi={setApi}
                        opts={{
                            align: 'start',
                            loop: true,
                            slidesToScroll: 1,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {companyReviews.map((review) => (
                                <CarouselItem key={review.id} className="md:basis-1/2 xl:basis-1/3">
                                    <CompanyReviewCard review={review} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-primary absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-orange-600" />
                        <CarouselNext className="bg-primary absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-orange-600" />
                    </Carousel>

                    <div className="mt-2 flex w-full justify-center gap-1">
                        {Array.from({ length: count }).map((_, index) => (
                            <Button
                                variant="ghost"
                                size="icon"
                                key={index}
                                className={clsx('hover:bg-primary h-4 w-4 cursor-pointer rounded-full transition-all', {
                                    'bg-primary': visibleSlides.includes(index),
                                    'bg-muted': !visibleSlides.includes(index),
                                })}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
