import { CompanyReviews } from '@/components/company-reviews';
import { Footer } from '@/components/footer';
import { Head } from '@inertiajs/react';
import { Header } from '../components/app-header';
import { Hero } from '../components/hero';

export default function Homepage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Home" />
            <Header />
            <main className="flex-1">
                <Hero />
                <CompanyReviews />
            </main>
            <Footer />
        </div>
    );
}
