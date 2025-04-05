import { useForm } from 'laravel-precognition-react-inertia';
import { ArrowLeft, ArrowRight, FileText, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import PersonalInfoStep from './steps/personal-info';
import ResumeStep from './steps/resume';

function ProgressSteps({ currentStep }: { currentStep: number }) {
    return (
        <div className="mb-8">
            <div className="flex justify-between">
                {/* Personal Info Step */}
                <div className={`flex flex-col items-center ${currentStep >= 0 ? 'text-primary' : 'text-gray-400'}`}>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                            currentStep >= 0 ? 'border-primary bg-primary/10' : 'border-gray-300'
                        }`}
                    >
                        <User className="h-5 w-5" />
                    </div>
                    <span className="mt-1 text-xs">Personal Info</span>
                </div>

                {/* Connecting Line */}
                <div className="flex flex-1 items-center">
                    <div className={`h-1 w-full ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                </div>

                {/* Resume & Experience Step */}
                <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                            currentStep >= 1 ? 'border-primary bg-primary/10' : 'border-gray-300'
                        }`}
                    >
                        <FileText className="h-5 w-5" />
                    </div>
                    <span className="mt-1 text-xs">Resume & Experience</span>
                </div>
            </div>
        </div>
    );
}

export type JobFormInterface = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    linkedin: string | null;
    portfolio: string | null;
    resume: File | null;
    cover_letter: string | null;
};

export default function JobApplicationForm({ jobSlug }: { jobSlug: string }) {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 2;

    const { data, setData, submit, processing, reset, validate, errors, setError } = useForm<JobFormInterface>(
        //placeholder
        'post',
        route('companies.reviews.store', {
            company: jobSlug,
        }),
        {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            linkedin: null,
            portfolio: null,
            resume: null,
            cover_letter: null,
        },
    );

    const resetForm = () => {
        reset();
        setCurrentStep(0);
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const nextStep = () => {
        // Validate current step
        if (currentStep === 0) {
            if (data['first_name'] === '') {
                setError('first_name', 'First name is required.');
                return;
            }
            if (data['last_name'] === '') {
                setError('last_name', 'Last name is required.');
                return;
            }
            if (data['email'] === '') {
                setError('email', 'Email is required.');
                return;
            }
            if (data['phone'] === '') {
                setError('phone', 'Phone number is required.');
                return;
            }
        }

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate final step

        submit({
            onSuccess: () => {
                resetForm();
                toast.success('Your application has been submitted successfully!');
            },
            onError: () => {
                toast.error('There was an error submitting your application. Please try again.');
            },
        });
    };

    const renderStepContent = () => {
        <ProgressSteps currentStep={currentStep} />;
        switch (currentStep) {
            case 0:
                return (
                    <PersonalInfoStep
                        errors={errors}
                        validate={validate}
                        first_name={data['first_name']}
                        setFirstName={(first_name: string) => setData('first_name', first_name)}
                        last_name={data['last_name']}
                        setLastName={(last_name: string) => setData('last_name', last_name)}
                        email={data['email']}
                        setEmail={(email: string) => setData('email', email)}
                        phone={data['phone']}
                        setPhone={(phone: string) => setData('phone', phone)}
                        linkedin={data['linkedin']}
                        setLinkedin={(linkedin: string | null) => setData('linkedin', linkedin)}
                        portfolio={data['portfolio']}
                        setPortfolio={(portfolio: string | null) => setData('portfolio', portfolio)}
                    />
                );
            case 1:
                return (
                    <ResumeStep
                        errors={errors}
                        validate={validate}
                        resume={data['resume']}
                        setResume={(resume: File | null) => setData('resume', resume)}
                        cover_letter={data['cover_letter']}
                        setCoverLetter={(cover_letter: string | null) => setData('cover_letter', cover_letter)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6 py-4">
            <form onSubmit={(e) => e.preventDefault()}>
                <ProgressSteps currentStep={currentStep} />

                {renderStepContent()}

                <div className="flex justify-between pt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={currentStep === 0 ? () => window.history.back() : prevStep}
                        disabled={processing}
                        className="cursor-pointer"
                    >
                        {currentStep === 0 ? (
                            'Cancel'
                        ) : (
                            <>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </>
                        )}
                    </Button>

                    {currentStep == 0 ? (
                        <Button type="button" onClick={nextStep} className="cursor-pointer">
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="button" onClick={handleSubmit} disabled={processing} className="cursor-pointer">
                            {processing ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
