import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Code, ExternalLink, Github, Linkedin, Mail, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState({
        mission: false,
        team: false,
        project: false,
        tech: false,
    });

    const missionRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const projectRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === missionRef.current) {
                        setIsVisible((prev) => ({ ...prev, mission: entry.isIntersecting }));
                    } else if (entry.target === teamRef.current) {
                        setIsVisible((prev) => ({ ...prev, team: entry.isIntersecting }));
                    } else if (entry.target === projectRef.current) {
                        setIsVisible((prev) => ({ ...prev, project: entry.isIntersecting }));
                    } else if (entry.target === techRef.current) {
                        setIsVisible((prev) => ({ ...prev, tech: entry.isIntersecting }));
                    }
                });
            },
            { threshold: 0.2 },
        );

        const elements = [missionRef.current, teamRef.current, projectRef.current, techRef.current];
        elements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            elements.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    const teamMembers = [
        {
            name: 'Linas Aleksandravičius',
            role: 'Scrum Master',
            image: 'https://avatars.fastly.steamstatic.com/0c14867f81304d13c601c0208128e245a0ea7c61_full.jpg',
            bio: 'Student at Kaunas University of Technology, specializing in Software Engineering. Responsible for project management and team coordination.',
            links: {
                github: 'https://github.com/Linux123123',
                linkedin: 'https://www.linkedin.com/in/linux123123/',
                email: 'linas.aleksandravicius@ktu.edu',
            },
        },
        {
            name: 'Redas Domkus',
            role: 'Developer',
            image: 'https://cdn.discordapp.com/attachments/320547336319401984/1361524212724007024/vABfNPF.jpeg?ex=67ff11bc&is=67fdc03c&hm=b63e864db6f55b80a61c106afdb6a1178353a148204d0a9dafc638c4ef4d5a0f&',
            bio: 'Student at Kaunas University of Technology, specializing in Software Engineering. Focused on backend development and database management.',
            links: {
                github: 'https://github.com/redas-dev',
                linkedin: 'https://www.linkedin.com/in/redas-domkus-51a193303/',
                email: 'redas.domkus@ktu.edu',
            },
        },
        {
            name: 'Gintaras Gaučys',
            role: 'Developer',
            image: 'https://media.discordapp.net/attachments/320547336319401984/1361524653365137510/image.png?ex=67ff1225&is=67fdc0a5&hm=c06849e0e624d50aab7851dc82df5f897ffd738632ac8b347279c3cf29f4ea48&=&format=webp&quality=lossless',
            bio: 'Student at Kaunas University of Technology, specializing in Software Engineering. Focused on frontend development and user experience design.',
            links: {
                github: 'https://github.com/gintaras741',
                linkedin: 'https://www.linkedin.com/in/gintaras-gau%C4%8Dys-066940292/',
                email: 'gintaras.gaucys@ktu.edu',
            },
        },
    ];

    const technologies = [
        { name: 'React', category: 'frontend' },
        { name: 'TypeScript', category: 'frontend' },
        { name: 'Tailwind CSS', category: 'frontend' },
        { name: 'shadcn/ui', category: 'frontend' },
        { name: 'Framer Motion', category: 'frontend' },
        { name: 'Laravel', category: 'backend' },
        { name: 'PHP', category: 'backend' },
        { name: 'Docker', category: 'deployment' },
    ];

    return (
        <div className="min-h-screen">
            <Head title="About Us" />
            {/* Hero Section - Simplified */}
            <section className="relative bg-gradient-to-r from-orange-500 to-orange-400 text-white">
                <div className="relative z-10 container mx-auto px-4 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <Badge className="mb-4 bg-white text-orange-500 hover:bg-white">University Project</Badge>
                        <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Meet the Team Behind InsideJob</h1>
                        <p className="mb-8 text-xl opacity-90 md:text-2xl">A group project created by three passionate university students</p>
                    </motion.div>
                </div>

                {/* Simplified wave divider */}
                <div
                    className="h-16 bg-white"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 75% 100%, 50% 0, 25% 100%, 0 0)',
                    }}
                />
            </section>

            {/* Mission Section */}
            <section ref={missionRef} className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <Badge className="mb-4 bg-orange-100 text-orange-500 hover:bg-orange-100">Our Mission</Badge>
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Reimagining Career Discovery</h2>
                        <p className="mb-8 text-lg text-gray-700">
                            As part of our Software Systems Engineering class at Kaunas University of Technology, we were tasked with creating a group
                            project. We chose to create a Glassdoor type website because we believe in the power of transparency in the job market and
                            wanted to understand the technical challenges behind building such a platform.
                        </p>
                        <div className="grid gap-8 text-left md:grid-cols-3">
                            <div className="rounded-lg bg-gray-50 p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 p-3">
                                    <BookOpen className="h-6 w-6 text-orange-500" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Educational Purpose</h3>
                                <p className="text-gray-600">
                                    This project serves as a hands-on learning experience to apply web development concepts in a real-world scenario.
                                </p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 p-3">
                                    <Code className="h-6 w-6 text-orange-500" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Technical Challenge</h3>
                                <p className="text-gray-600">
                                    We challenged ourselves to implement complex features like job search, company reviews, and user authentication.
                                </p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 p-3">
                                    <Users className="h-6 w-6 text-orange-500" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Collaboration</h3>
                                <p className="text-gray-600">
                                    Working as a team allowed us to divide responsibilities, practice git workflows, and simulate a professional
                                    development environment.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section - Simplified animations */}
            <section ref={teamRef} className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mx-auto mb-12 max-w-4xl text-center"
                    >
                        <Badge className="mb-4 bg-orange-100 text-orange-500 hover:bg-orange-100">Our Team</Badge>
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Meet the Developers</h2>
                        <p className="text-lg text-gray-700">
                            We're a team of three university students passionate about web development and user experience design.
                        </p>
                    </motion.div>

                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        {teamMembers.map((member) => (
                            <Card key={member.name} className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="group relative overflow-hidden">
                                    <img
                                        src={member.image || '/placeholder.svg'}
                                        alt={member.name}
                                        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex w-full justify-center gap-3 p-4">
                                            <a
                                                href={member.links.github}
                                                className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
                                            >
                                                <Github className="h-5 w-5 text-white" />
                                            </a>
                                            <a
                                                href={member.links.linkedin}
                                                className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
                                            >
                                                <Linkedin className="h-5 w-5 text-white" />
                                            </a>
                                            <a
                                                href={`mailto:${member.links.email}`}
                                                className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
                                            >
                                                <Mail className="h-5 w-5 text-white" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                                    <div className="mb-3 text-sm text-orange-500">{member.role}</div>
                                    <p className="text-sm text-gray-600">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Details Section - Simplified */}
            <section ref={projectRef} className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible.project ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-4xl"
                    >
                        <div className="mb-12 text-center">
                            <Badge className="mb-4 bg-orange-100 text-orange-500 hover:bg-orange-100">Project Details</Badge>
                            <h2 className="mb-6 text-3xl font-bold md:text-4xl">About Our University Project</h2>
                            <p className="text-lg text-gray-700">InsideJob was developed as our project for Software Systems Engineering</p>
                        </div>

                        <div className="grid items-center gap-12 md:grid-cols-2">
                            <div>
                                <h3 className="mb-4 text-2xl font-bold">Course Information</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="mt-1 mr-3 rounded-full bg-orange-100 p-2">
                                            <BookOpen className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <span className="block font-medium">Software Systems Engineering</span>
                                            <span className="text-sm text-gray-600">Spring 2025 Semester</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="mt-1 mr-3 rounded-full bg-orange-100 p-2">
                                            <Calendar className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <span className="block font-medium">Project Duration: 1 Semester (~ 4months)</span>
                                            <span className="text-sm text-gray-600">February 1 - May 30, 2025</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="mt-8">
                                    <h3 className="mb-4 text-2xl font-bold">Project Requirements</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-center">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                            Create a functional clone Glassdoor
                                        </li>
                                        <li className="flex items-center">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                            Implement responsive design for all device sizes
                                        </li>
                                        <li className="flex items-center">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                            Use modern frontend frameworks and libraries
                                        </li>
                                        <li className="flex items-center">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                            Implement user authentication and authorization
                                        </li>
                                        <li className="flex items-center">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-orange-500"></div>
                                            Document the development process and technical decisions
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="rounded-lg bg-gray-100 p-8">
                                <h3 className="mb-6 text-2xl font-bold">Our Process</h3>

                                <div className="space-y-8">
                                    <div className="relative border-l-2 border-orange-200 pb-8 pl-8">
                                        <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-orange-500"></div>
                                        <h4 className="mb-2 text-lg font-semibold">Research & Planning</h4>
                                        <p className="text-sm text-gray-600">
                                            We analyzed Glassdoor's features, user flows, and design patterns to understand what makes the platform
                                            effective. Then we created wireframes and a project roadmap.
                                        </p>
                                    </div>

                                    <div className="relative border-l-2 border-orange-200 pb-8 pl-8">
                                        <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-orange-500"></div>
                                        <h4 className="mb-2 text-lg font-semibold">Design & Development</h4>
                                        <p className="text-sm text-gray-600">
                                            We built the frontend components using React and shadcn, implemented responsive design with Tailwind CSS,
                                            and created the backend with Laravel.
                                        </p>
                                    </div>

                                    <div className="relative pl-8">
                                        <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-orange-500"></div>
                                        <h4 className="mb-2 text-lg font-semibold">Testing & Refinement</h4>
                                        <p className="text-sm text-gray-600">
                                            We conducted user testing with classmates, gathered feedback, and made iterative improvements to enhance
                                            the user experience and fix bugs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technologies Section - Simplified */}
            <section ref={techRef} className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible.tech ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="mx-auto mb-12 max-w-4xl text-center"
                    >
                        <Badge className="mb-4 bg-orange-100 text-orange-500 hover:bg-orange-100">Tech Stack</Badge>
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Technologies We Used</h2>
                        <p className="text-lg text-gray-700">
                            Our project leverages modern web technologies to create a responsive and interactive user experience
                        </p>
                    </motion.div>

                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 flex flex-wrap justify-center gap-3">
                            {technologies.map((tech) => (
                                <Badge
                                    key={tech.name}
                                    className={`px-4 py-2 text-sm ${
                                        tech.category === 'frontend'
                                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                            : tech.category === 'backend'
                                              ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                              : 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                                    }`}
                                >
                                    {tech.name}
                                </Badge>
                            ))}
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-sm">
                            <h3 className="mb-6 text-center text-xl font-bold">Learning Outcomes</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 rounded-full bg-orange-100 p-2">
                                            <Code className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Modern Web Development</h4>
                                            <p className="text-sm text-gray-600">
                                                Gained hands-on experience with React, Laravel, and TypeScript in a complex application
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 rounded-full bg-orange-100 p-2">
                                            <Users className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Team Collaboration</h4>
                                            <p className="text-sm text-gray-600">
                                                Practiced git workflows, code reviews, and agile development methodologies
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 rounded-full bg-orange-100 p-2">
                                            <BookOpen className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Problem Solving</h4>
                                            <p className="text-sm text-gray-600">
                                                Developed critical thinking skills by tackling complex technical challenges
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-3 rounded-full bg-orange-100 p-2">
                                            <ExternalLink className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Real-world Application</h4>
                                            <p className="text-sm text-gray-600">
                                                Applied classroom concepts to build a practical, production-quality web application
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Simplified */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-20 text-white">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Want to Learn More?</h2>
                        <p className="mb-8 text-xl opacity-90">
                            Check out our project repository or contact us for more information about our development process
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" variant="secondary" className="gap-2">
                                <Github className="h-5 w-5" />
                                <a href="https://github.com/inz-inside-job/inside-job" rel="noopener noreferrer">
                                    View on GitHub
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
