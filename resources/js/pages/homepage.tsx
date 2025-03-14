import { CompanyReviews } from '@/components/homepage/company-reviews';
import { Head } from '@inertiajs/react';
import { Hero } from '../components/homepage/hero';

export default function Homepage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Home" />
            <Hero />
            <CompanyReviews />
        </div>
    );
}
