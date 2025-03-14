import { CompanyReviews } from '@/components/homepage/company-reviews';
import { Head } from '@inertiajs/react';
import { Hero } from '../components/homepage/hero';

export default function Homepage() {
    return (
        <>
            <Head title="Home" />
            <Hero />
            <CompanyReviews />
        </>
    );
}
