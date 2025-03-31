import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import clsx from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CompanyReviewCard } from './company-review-card';

interface ComapnyProps extends PageProps {
    reviews: App.Data.Home.ReviewData[];
}

export function CompanyReviews() {
    const { reviews } = usePage<ComapnyProps>().props;

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
                            {reviews.map((review) => (
                                <CarouselItem key={review.id} className="md:basis-1/2 xl:basis-1/3">
                                    <CompanyReviewCard review={review} company={review.company} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="bg-primary absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 hover:bg-orange-600" />
                        <CarouselNext className="bg-primary absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 hover:bg-orange-600" />
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
