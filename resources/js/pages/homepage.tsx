import { CompanyReviews } from '@/components/company-reviews';
import { Head } from '@inertiajs/react';
import { Hero } from '../components/hero';

export default function Homepage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Home" />
            <main className="flex-1">
                <Hero />
                <CompanyReviews />
            </main>
        </div>
    );
}
