import { CompanyReviews } from '@/components/homepage/company-reviews';
import { Head } from '@inertiajs/react';
import { Hero } from '../components/homepage/hero';

export default function Homepage({ reviews }: { reviews: App.Data.ReviewData[] }) {
    return (
        <>
            <Head title="Home" />
            <Hero />
            <CompanyReviews reviews={reviews} />
        </>
    );
}
