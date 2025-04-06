import { useForm } from 'laravel-precognition-react-inertia';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ProgressSteps from '../progress-steps';
import { ResponsiveModal, ResponsiveModalDescription, ResponsiveModalHeader, ResponsiveModalTitle } from '../responsive-modal';
import { Button } from '../ui/button';
import BasicInformationStep from './steps/basic-information';
import CompanyTypeStep from './steps/company-type';
import CompanyDetailsStep from './steps/details';
import ReviewInformationStep from './steps/review-information';

type CompanyType = 'public' | 'private' | 'non-profit';

export type SubmitCompanyInterface = {
    name: string;
    industry: string;
    description: string;
    employee_count: number;
    founded_year: Date;
    ceo: string;
    type: CompanyType;
};

export default function SubmitCompanyButton() {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 4;

    const { data, setData, reset, processing, errors, setError, submit } = useForm<SubmitCompanyInterface>('post', route('companies.submit'), {
        name: '',
        industry: '',
        description: '',
        employee_count: 0,
        founded_year: new Date(),
        ceo: '',
        type: 'public',
    });

    // Step titles
    const stepTitles = ['Basic information', 'Company Details', 'Company Type', 'Review & Submit'];

    // Step descriptions
    const stepDescriptions = [
        'Enter the basic details about the company',
        'Tell us more about the company',
        'Select the type of company',
        'Review your information before submitting',
    ];

    const resetForm = () => {
        reset();
        setCurrentStep(0);
    };

    const nextStep = () => {
        // Validate current step
        if (currentStep === 0) {
            if (!data['name'].trim()) {
                setError('name', 'Please enter your position.');
                return;
            }
            if (!data['industry'].trim()) {
                setError('industry', 'Please enter the industry.');
                return;
            }
            if (!data['ceo'].trim()) {
                setError('ceo', 'Please enter a description.');
                return;
            }
        }

        if (currentStep === 1) {
            if (!data['description'].trim()) {
                setError('description', 'Please enter a description.');
                return;
            }
            if (data['employee_count'] <= 0) {
                setError('employee_count', 'Please enter a valid employee count.');
                return;
            }
            if (data['founded_year'] > new Date()) {
                setError('founded_year', 'Please enter a valid founded year.');
                return;
            }
        }

        if (currentStep === 2 && !data['type']) {
            setError('type', 'Please select a company type.');
            return;
        }

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        submit({
            onSuccess: () => {
                resetForm();
                setOpen(false);
                toast.success('Your company has been submitted successfully!');
            },
            onError: () => {
                toast.error('There was an error submitting the company. Please try again.');
            },
        });
    };

    // Render the current step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <BasicInformationStep data={data} setData={setData} errors={errors} />;
            case 1:
                return <CompanyDetailsStep data={data} setData={setData} errors={errors} />;
            case 2:
                return <CompanyTypeStep data={data} setData={setData} errors={errors} />;
            case 3:
                return <ReviewInformationStep data={data} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600" onClick={() => setOpen(true)}>
                <Building2 className="mr-2 h-4 w-4" />
                Don't see a company you like? Submit it!
            </Button>
            <ResponsiveModal
                open={open}
                onOpenChange={(newOpen) => {
                    setOpen(newOpen);
                    if (!newOpen) resetForm();
                }}
            >
                <ResponsiveModalHeader>
                    <ResponsiveModalTitle>{stepTitles[currentStep]}</ResponsiveModalTitle>
                    <ResponsiveModalDescription>{stepDescriptions[currentStep]}</ResponsiveModalDescription>
                </ResponsiveModalHeader>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 py-4">
                    <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />

                    {renderStepContent()}

                    <div className="flex justify-between pt-6">
                        <Button type="button" variant="outline" onClick={currentStep === 0 ? () => setOpen(false) : prevStep} disabled={processing}>
                            {currentStep === 0 ? (
                                'Cancel'
                            ) : (
                                <>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </>
                            )}
                        </Button>

                        {currentStep < totalSteps - 1 ? (
                            <Button type="button" onClick={nextStep}>
                                Next
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="button" onClick={handleSubmit} disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit company'}
                            </Button>
                        )}
                    </div>
                </form>
            </ResponsiveModal>
        </>
    );
}
