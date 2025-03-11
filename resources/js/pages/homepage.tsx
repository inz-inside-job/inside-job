import { CompanyReviews } from '@/components/company-reviews';
import { Footer } from '@/components/footer';
import { Header } from '../components/header';
import { Hero } from '../components/hero';

export default function Homepage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1"></main>
            <main className="flex-1">
                <Hero />
                <CompanyReviews />
            </main>
            <Footer />
        </div>
    );
}
