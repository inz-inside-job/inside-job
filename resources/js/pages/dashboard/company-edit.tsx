import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { Link } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type CompanyFormValues = {
    name: string;
    description: string;
    logo?: File | null;
    header?: File | null;
    website: string;
    industry: string;
    location: string;
    mission: string | null;
    employee_count: number;
    type: string;
    ceo: string;
    benefits: string[];
};

export default function CompanyEdit({ company }: { company: App.Data.Company.CompanyEditData }) {
    const [newBenefit, setNewBenefit] = useState('');
    const [logoPreview, setLogoPreview] = useState<string | null>(company.logo);
    const [headerPreview, setHeaderPreview] = useState<string | null>(company.header);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const headerInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, submit, errors, validate } = useForm<CompanyFormValues>(
        'post',
        route('dashboard.edit', {
            company: company.slug,
        }),
        {
            name: company.name,
            description: company.description,
            logo: null,
            header: null,
            website: company.website,
            industry: company.industry,
            location: company.location,
            mission: company.mission,
            employee_count: company.employee_count,
            type: company.type,
            ceo: company.ceo,
            benefits: company.benefits || [],
        },
    );

    function onSubmit() {
        submit({
            onSuccess: () => {
                toast.success('Company updated successfully');
            },
            onError: (errors) => {
                toast.error('Failed to update company');
                console.error(errors);
            },
        });
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            setData('logo', file);
        }
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeaderPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            setData('header', file);
        }
    };

    const addBenefit = () => {
        if (newBenefit.trim() === '') return;

        const currentBenefits = data.benefits || [];
        setData('benefits', [...currentBenefits, newBenefit.trim()]);
        setNewBenefit('');
    };

    const removeBenefit = (index: number) => {
        const currentBenefits = data.benefits || [];
        setData(
            'benefits',
            currentBenefits.filter((_, i) => i !== index),
        );
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Update your company's basic information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Label htmlFor="name" className="text-base font-medium">
                                Company Name
                            </Label>
                            <Input
                                name={'name'}
                                type="text"
                                placeholder="Company Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                onBlur={() => validate('name')}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-base font-medium">Company Logo</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-muted flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border">
                                            {logoPreview ? (
                                                <img
                                                    src={logoPreview || '/placeholder.svg'}
                                                    alt="Logo preview"
                                                    className="h-full w-full object-contain"
                                                />
                                            ) : (
                                                <div className="text-muted-foreground p-2 text-center text-sm">No logo</div>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer"
                                            asChild
                                            onClick={() => logoInputRef.current?.click()}
                                        >
                                            <div>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload Logo
                                            </div>
                                        </Button>
                                        <Input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-base font-medium">Header Image</Label>
                                    <div className="space-y-4">
                                        <div className="bg-muted flex h-40 w-full items-center justify-center overflow-hidden rounded-md border">
                                            {headerPreview ? (
                                                <img
                                                    src={headerPreview || '/placeholder.svg'}
                                                    alt="Banner preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-muted-foreground p-2 text-center text-sm">No banner image</div>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer"
                                            asChild
                                            onClick={() => headerInputRef.current?.click()}
                                        >
                                            <div>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload Banner
                                            </div>
                                        </Button>
                                        <Input ref={headerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
                                    </div>
                                </div>
                            </div>

                            <Label className="text-base font-medium">Description</Label>
                            <Textarea
                                placeholder={'Company Description'}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                onBlur={() => validate('description')}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            <Label className="text-base font-medium">Website</Label>
                            <Input
                                type={'text'}
                                placeholder="Website"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                onBlur={() => validate('website')}
                            />
                            {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Company Details</CardTitle>
                            <CardDescription>Provide more specific information about your company.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Label className="text-base font-medium">Industry</Label>
                            <Input
                                type={'text'}
                                placeholder="Industry"
                                value={data.industry}
                                onChange={(e) => setData('industry', e.target.value)}
                                onBlur={() => validate('industry')}
                            />
                            {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
                            <Label className="text-base font-medium">Location</Label>
                            <Input
                                type={'text'}
                                placeholder={'Location'}
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                onBlur={() => validate('location')}
                            />
                            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                            <Label className="text-base font-medium">Company Mission</Label>
                            <Textarea
                                placeholder="Company Mission"
                                value={data.mission ?? ''}
                                onChange={(e) => setData('mission', e.target.value)}
                                onBlur={() => validate('mission')}
                            />
                            {errors.mission && <p className="text-sm text-red-500">{errors.mission}</p>}

                            <Label className="text-base font-medium">Employee count</Label>
                            <Input
                                type={'text'}
                                placeholder="Employee Count"
                                value={data.employee_count}
                                onChange={(e) => setData('employee_count', parseInt(e.target.value))}
                                onBlur={() => validate('employee_count')}
                            />
                            {errors.employee_count && <p className="text-sm text-red-500">{errors.employee_count}</p>}

                            <Label className="text-base font-medium">Company type</Label>
                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Company Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Public">Public</SelectItem>
                                    <SelectItem value="Private">Private</SelectItem>
                                    <SelectItem value="Nonprofit">Non-profit</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}

                            <Label className="text-base font-medium">CEO</Label>
                            <Input
                                type={'text'}
                                placeholder="CEO"
                                value={data.ceo}
                                onChange={(e) => setData('ceo', e.target.value)}
                                onBlur={() => validate('ceo')}
                            />
                            {errors.ceo && <p className="text-sm text-red-500">{errors.ceo}</p>}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Company Benefits</CardTitle>
                        <CardDescription>List the benefits your company offers to employees.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a benefit"
                                    value={newBenefit}
                                    onChange={(e) => setNewBenefit(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addBenefit();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addBenefit} size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {data.benefits.length > 0 ? (
                                    <ul className="space-y-2">
                                        {data.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-center justify-between rounded-md border p-3">
                                                <span>{benefit}</span>
                                                <Button type="button" variant="ghost" size="sm" onClick={() => removeBenefit(index)}>
                                                    <Trash2 className="text-destructive h-4 w-4" />
                                                    <span className="sr-only">Remove</span>
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-muted-foreground text-sm">No benefits added yet.</div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="ml-auto" onClick={onSubmit}>
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>View applications</CardTitle>
                        <CardDescription>View and manage applications for your company.</CardDescription>
                    </CardHeader>

                    <CardFooter>
                        <Link href={`/dashboard/${company.slug}/applications`}>
                            <Button variant="default" className="ml-auto">
                                View Applications
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>View jobs</CardTitle>
                        <CardDescription>View and manage jobs for your company.</CardDescription>
                    </CardHeader>

                    <CardFooter>
                        <Link href={`/dashboard/${company.slug}/jobs`}>
                            <Button variant="default" className="ml-auto">
                                View Jobs
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </DashboardLayout>
    );
}
