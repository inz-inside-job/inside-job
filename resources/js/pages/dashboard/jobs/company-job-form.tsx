import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { ArrowLeft, Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function JobForm({ job, company }: { job: App.Data.Jobs.JobData | null; company: App.Data.Jobs.JobCompanyData }) {
    const isEditMode = !!job;

    const url = isEditMode
        ? route('dashboard.jobs.update', { company: company.slug, job: job.slug })
        : route('dashboard.jobs.store', { company: company.slug });

    const { data, setData, errors, submit, validate, processing } = useForm<App.Data.Jobs.JobFormData>('post', url, {
        description: job?.description || '',
        employment_experience: job?.employment_experience || 'Mid Level',
        employment_type: job?.employment_type || 'Internship',
        location: job?.location || '',
        requirements: job?.requirements || [''],
        salary_max: job?.salary_max || 0,
        salary_min: job?.salary_min || 0,
        title: job?.title || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submit({
            onSuccess: () => {
                toast.success(isEditMode ? 'Job updated successfully!' : 'Job created successfully!');
            },
            onError: () => {
                toast.error('Failed to save.');
            },
        });
    };

    return (
        <>
            <Head title={isEditMode ? 'Edit Job' : 'Create Job'} />
            <DashboardLayout>
                <div className="container mx-auto py-6">
                    <div className="mb-6">
                        <Link href={route('dashboard.jobs', { company: company.slug })}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Jobs
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader className="border-b">
                            <div className="mb-4 flex items-center justify-between">
                                <CardTitle>{isEditMode ? 'Edit Job' : 'Create New Job'}</CardTitle>
                                {/* TODO: implement link */}
                                {isEditMode && job && (
                                    <Link href={route('dashboard.applications', { company: company.slug })}>
                                        <Button variant="outline">
                                            <Users className="mr-2 h-4 w-4" />
                                            Applications ({job.applications_count})
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Job Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            onBlur={() => validate('title')}
                                            placeholder="e.g. Senior Frontend Developer"
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onBlur={() => validate('location')}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="e.g. New York, NY or Remote"
                                            required
                                        />
                                        <InputError message={errors.location} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="employment_type">Employment Type</Label>
                                        <Select
                                            value={data.employment_type}
                                            onValueChange={(value: App.Enums.EmploymentType) => setData('employment_type', value)}
                                        >
                                            <SelectTrigger id="employment_type">
                                                <SelectValue placeholder="Select employment type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Full Time">Full-time</SelectItem>
                                                <SelectItem value="Part Time">Part-time</SelectItem>
                                                <SelectItem value="Contract">Contract</SelectItem>
                                                <SelectItem value="Freelance">Freelance</SelectItem>
                                                <SelectItem value="Internship">Internship</SelectItem>
                                                <SelectItem value="Temporary">Temporary</SelectItem>
                                                <SelectItem value="Remote">Remote</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="employment_experience">Experience Level</Label>
                                        <Select
                                            value={data.employment_experience}
                                            onValueChange={(value: App.Enums.EmploymentExperience) => setData('employment_experience', value)}
                                        >
                                            <SelectTrigger id="employment_experience">
                                                <SelectValue placeholder="Select experience level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Entry Level">Entry level</SelectItem>
                                                <SelectItem value="Mid Level">Mid level</SelectItem>
                                                <SelectItem value="Senior Level">Senior level</SelectItem>
                                                <SelectItem value="Manager">Manager</SelectItem>
                                                <SelectItem value="Director">Director</SelectItem>
                                                <SelectItem value="Executive">Executive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="salary_min">Minimum Salary</Label>
                                        <Input
                                            id="salary_min"
                                            type="number"
                                            value={data.salary_min}
                                            onChange={(e) => setData('salary_min', parseInt(e.target.value))}
                                            onBlur={() => validate('salary_min')}
                                            placeholder="e.g. 80000"
                                            required
                                        />
                                        <InputError message={errors.salary_min} className="mt-2" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="salary_max">Maximum Salary</Label>
                                        <Input
                                            id="salary_max"
                                            type="number"
                                            value={data.salary_max}
                                            onChange={(e) => setData('salary_max', parseInt(e.target.value))}
                                            onBlur={() => validate('salary_max')}
                                            placeholder="e.g. 120000"
                                            required
                                        />
                                        <InputError message={errors.salary_max} className="mt-2" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Job Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        onBlur={() => validate('description')}
                                        placeholder="Describe the role, responsibilities, and other details"
                                        rows={6}
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Requirements</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setData('requirements', [...data.requirements, ''])}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Requirement
                                        </Button>
                                    </div>

                                    {data.requirements.map((requirement, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="flex w-full flex-col">
                                                <Input
                                                    value={requirement}
                                                    onChange={(e) =>
                                                        setData(
                                                            'requirements',
                                                            data.requirements.map((req, i) => (i === index ? e.target.value : req)),
                                                        )
                                                    }
                                                    placeholder={`Requirement ${index + 1}`}
                                                    className="w-full"
                                                />
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <InputError message={(errors as any)[`requirements.${index}`]} className="mt-2" />
                                            </div>
                                            {data.requirements.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        setData(
                                                            'requirements',
                                                            data.requirements.filter((_, i) => i !== index),
                                                        )
                                                    }
                                                    className="shrink-0"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href={route('dashboard.jobs', { company: company.slug })}>
                                        <Button variant="outline">Cancel</Button>
                                    </Link>
                                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={processing}>
                                        {processing ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Job'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        </>
    );
}
