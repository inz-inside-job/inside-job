import { Building2, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-footer text-footer-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <a href="/" className="mb-4 flex items-center gap-2">
                            <Building2 className="h-8 w-8 text-orange-500" />
                            <span className="text-xl font-bold text-white">InsideJob</span>
                        </a>
                        <p className="mb-6 max-w-md text-sm">
                            InsideJob is the worldwide leader in insights about jobs and companies. Built on the foundation of increasing workplace
                            transparency, InsideJob helps people find a job and company they love.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">For Job Seekers</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Browse Jobs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Company Reviews
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Salary Calculator
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Interview Questions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Career Advice
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">For Employers</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Post a Job
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Employer Branding
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Recruiting Solutions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Employer Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Talent Solutions
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">About</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Press
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Investor Relations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-sm">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="flex flex-wrap gap-4">
                            <a href="#" className="transition-colors hover:text-white">
                                Privacy & Cookies
                            </a>
                            <a href="#" className="transition-colors hover:text-white">
                                Terms of Use
                            </a>
                            <a href="#" className="transition-colors hover:text-white">
                                Copyright & Legal
                            </a>
                            <a href="#" className="transition-colors hover:text-white">
                                Do Not Sell My Personal Information
                            </a>
                        </div>
                        <div className="text-footer-foreground">© 2024 Agile Avengers All Rights Reserved.</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
