import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Banknote, BrainCircuit, Cloud, Factory, Network, Rocket, Server, ShoppingCart, Star, Syringe } from 'lucide-react';
import { useState } from 'react';
import CompanyCard from './company-card';

type Company = {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    industry: string;
    overview: string;
    employees: number;
    avgSalary: string;
    recommendPercent: number;
    logo?: React.ReactNode;
    badge?: {
        label: string;
        icon: React.ReactNode;
    };
};

const companies: Company[] = [
    {
        id: 'cloud-innovators',
        name: 'Cloud Innovators',
        location: 'San Francisco, CA',
        rating: 4.5,
        reviews: 2450,
        industry: 'Cloud Computing',
        overview: 'Pioneers in enterprise cloud solutions with AI-powered infrastructure management',
        employees: 4500,
        avgSalary: '$145K',
        recommendPercent: 89,
        logo: <Cloud className="h-12 w-12 text-blue-500" />,
        badge: {
            label: 'Fast Growing',
            icon: <Rocket className="mr-1 h-3 w-3" />,
        },
    },
    {
        id: 'neurotech-labs',
        name: 'NeuroTech Labs',
        location: 'Boston, MA',
        rating: 4.2,
        reviews: 1678,
        industry: 'Biotechnology',
        overview: 'Leading research in neural interfaces and cognitive enhancement technologies',
        employees: 1200,
        avgSalary: '$165K',
        recommendPercent: 85,
        logo: <BrainCircuit className="h-12 w-12 text-purple-500" />,
    },
    {
        id: 'quantum-systems',
        name: 'Quantum Systems',
        location: 'Toronto, Canada',
        rating: 4.7,
        reviews: 3452,
        industry: 'Quantum Computing',
        overview: 'Developing next-generation quantum processors for commercial applications',
        employees: 2800,
        avgSalary: '$195K',
        recommendPercent: 92,
        badge: {
            label: 'Top Employer',
            icon: <Star className="mr-1 h-3 w-3" />,
        },
    },
    {
        id: 'green-energy-co',
        name: 'Green Energy Co.',
        location: 'Austin, TX',
        rating: 4.1,
        reviews: 892,
        industry: 'Renewable Energy',
        overview: 'Sustainable energy solutions for residential and commercial applications',
        employees: 3400,
        avgSalary: '$125K',
        recommendPercent: 78,
    },
    {
        id: 'cyber-secure',
        name: 'CyberSecure',
        location: 'Washington, D.C.',
        rating: 4.6,
        reviews: 4312,
        industry: 'Cybersecurity',
        overview: 'Enterprise-grade security solutions for government and private sector',
        employees: 5600,
        avgSalary: '$155K',
        recommendPercent: 91,
        logo: <Server className="h-12 w-12 text-green-500" />,
    },
    {
        id: 'logistics-masters',
        name: 'Logistics Masters',
        location: 'Singapore',
        rating: 4.3,
        reviews: 1567,
        industry: 'Supply Chain',
        overview: 'AI-driven logistics optimization for global supply chains',
        employees: 8900,
        avgSalary: '$135K',
        recommendPercent: 84,
        logo: <Network className="h-12 w-12 text-orange-500" />,
    },
    {
        id: 'precision-manufacturing',
        name: 'Precision Manufacturing',
        location: 'Munich, Germany',
        rating: 3.9,
        reviews: 654,
        industry: 'Advanced Manufacturing',
        overview: 'High-precision components for aerospace and automotive industries',
        employees: 12000,
        avgSalary: '$115K',
        recommendPercent: 72,
        logo: <Factory className="h-12 w-12 text-gray-500" />,
    },
    {
        id: 'genome-pioneers',
        name: 'Genome Pioneers',
        location: 'San Diego, CA',
        rating: 4.4,
        reviews: 2345,
        industry: 'Genomics',
        overview: 'Personalized medicine through advanced genome sequencing',
        employees: 1800,
        avgSalary: '$175K',
        recommendPercent: 88,
        logo: <Syringe className="h-12 w-12 text-red-500" />,
    },
    {
        id: 'fintech-global',
        name: 'FinTech Global',
        location: 'New York, NY',
        rating: 4.8,
        reviews: 5123,
        industry: 'Financial Technology',
        overview: 'Digital banking solutions and blockchain-based financial services',
        employees: 6500,
        avgSalary: '$185K',
        recommendPercent: 94,
        logo: <Banknote className="h-12 w-12 text-green-600" />,
    },
    {
        id: 'smart-retail',
        name: 'Smart Retail',
        location: 'London, UK',
        rating: 4.0,
        reviews: 987,
        industry: 'Retail Tech',
        overview: 'AI-powered retail optimization and customer experience platforms',
        employees: 2300,
        avgSalary: '$130K',
        recommendPercent: 79,
        logo: <ShoppingCart className="h-12 w-12 text-blue-600" />,
    },
];

export function CompanyGrid() {
    const [sortOption, setSortOption] = useState('rating');

    // Sort companies based on selected option
    const sortedCompanies = [...companies].sort((a, b) => {
        if (sortOption === 'rating') {
            return b.rating - a.rating;
        } else if (sortOption === 'reviews') {
            return b.reviews - a.reviews;
        } else if (sortOption === 'recommend') {
            return b.recommendPercent - a.recommendPercent;
        }
        return 0;
    });

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{companies.length} Companies</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <Select defaultValue="rating" onValueChange={setSortOption}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rating">Highest Rating</SelectItem>
                            <SelectItem value="reviews">Most Reviews</SelectItem>
                            <SelectItem value="recommend">Most Recommended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
                {sortedCompanies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>

            <div className="mt-8 text-center">
                <Button variant="outline" className="mx-auto">
                    Load More Companies
                </Button>
            </div>
        </div>
    );
}
