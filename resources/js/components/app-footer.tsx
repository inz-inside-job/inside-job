import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';

export function Footer() {
    return (
        <footer className="bg-footer text-footer-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link href="/" className="mb-4 flex items-center gap-2">
                            <AppLogoIcon className="h-8 w-8 text-orange-500" />
                            <span className="text-xl font-bold text-white">InsideJob</span>
                        </Link>
                        <p className="mb-6 max-w-md text-sm">
                            InsideJob is the worldwide leader in insights about jobs and companies. Built on the foundation of increasing workplace
                            transparency, InsideJob helps people find a job and company they love.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/redas.domkus" className="text-gray-400 transition-colors hover:text-white">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://x.com/linasalexx" className="text-gray-400 transition-colors hover:text-white">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://www.instagram.com/redasdom/" className="text-gray-400 transition-colors hover:text-white">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/in/redas-domkus-51a193303" className="text-gray-400 transition-colors hover:text-white">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">For Job Seekers</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="jobs" className="transition-colors hover:text-white">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-white">
                                    Company Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">For Employers</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="#" className="transition-colors hover:text-white">
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="transition-colors hover:text-white">
                                    Add Your Company
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-white">About</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="about" className="transition-colors hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <a href="mailto: gintaras.gaucys@ktu.edu" className="transition-colors hover:text-white">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-sm">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="flex flex-wrap gap-4">
                            <Link href="#" className="transition-colors hover:text-white">
                                Privacy & Cookies
                            </Link>
                            <Link href="#" className="transition-colors hover:text-white">
                                Terms of Use
                            </Link>
                            <Link href="#" className="transition-colors hover:text-white">
                                Copyright & Legal
                            </Link>
                            <Link href="#" className="transition-colors hover:text-white">
                                Do Not Sell My Personal Information
                            </Link>
                        </div>
                        <div className="text-footer-foreground">© {new Date().getFullYear()} Agile Avengers All Rights Reserved.</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
