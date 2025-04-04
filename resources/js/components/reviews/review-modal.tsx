import type React from 'react';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useForm } from 'laravel-precognition-react-inertia';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ResponsiveModal, ResponsiveModalDescription, ResponsiveModalHeader, ResponsiveModalTitle } from '../responsive-modal';
import PositionStep from './steps/position';
import ProsConsStep from './steps/pros-cons';
import RateAndReviewStep from './steps/rate-review';
import RecommendStep from './steps/recommend';
import ReviewStep from './steps/review';

// Progress Steps Component
function ProgressSteps({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
    return (
        <div className="mb-6 flex items-center justify-center space-x-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                    key={index}
                    className={clsx('h-2 rounded-full transition-all', {
                        'bg-primary w-8': index < currentStep,
                        'bg-primary w-12': index === currentStep,
                        'w-8 bg-gray-200': index > currentStep,
                    })}
                ></div>
            ))}
        </div>
    );
}

export type ReviewFormInterface = {
    pros: string[];
    cons: string[];
    position: string;
    work_life_balance: number;
    culture_values: number;
    career_opportunities: number;
    compensation_benefits: number;
    senior_management: number;
    recommend: boolean | null;
    approve_of_ceo: boolean | null;
    rating: number;
    review: string;
};

export default function ReviewModal({ companySlug }: { companySlug: string }) {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 5;

    const { data, setData, submit, processing, reset } = useForm<ReviewFormInterface>(
        'post',
        route('companies.reviews.store', {
            slug: companySlug,
        }),
        {
            pros: [],
            cons: [],
            position: '',
            work_life_balance: 3,
            culture_values: 3,
            career_opportunities: 3,
            compensation_benefits: 3,
            senior_management: 3,
            recommend: null,
            approve_of_ceo: null,
            rating: 3,
            review: '',
        },
    );

    // Step titles
    const stepTitles = ['Your Position', 'Pros & Cons', 'Rate the Company', 'Recommendation', 'Final Thoughts'];

    // Step descriptions
    const stepDescriptions = [
        'Tell us about your role at the company',
        'Share what you liked and disliked about working here',
        'Rate different aspects of the company',
        'Would you recommend this company to others?',
        'Share your overall thoughts',
    ];

    const resetForm = () => {
        reset();
        setCurrentStep(0);
    };

    const nextStep = () => {
        // Validate current step
        if (currentStep === 0 && !data['position'].trim()) {
            alert('Please enter your position before continuing.');
            return;
        }

        if (currentStep === 1) {
            const validPros = data['pros'].filter((pro) => pro.trim() !== '');
            const validCons = data['cons'].filter((con) => con.trim() !== '');

            if (validPros.length === 0 || validCons.length === 0) {
                alert('Please add at least one pro and one con before continuing.');
                return;
            }
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

        // Validate final step
        if (data['recommend'] === null || data['approve_of_ceo'] === null) {
            alert('Please answer all questions before submitting.');
            return;
        }

        submit({
            onSuccess: () => {
                resetForm();
                setOpen(false);
                toast.success('Your review has been submitted successfully!');
            },
            onError: () => {
                toast.error('There was an error submitting your review. Please try again.');
            },
        });
    };

    // Render the current step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <PositionStep position={data['position']} setPosition={(position: string) => setData('position', position)} />;
            case 1:
                return <ProsConsStep data={data} setData={(key: keyof ReviewFormInterface, value: string[]) => setData(key, value)} />;
            case 2:
                return <ReviewStep data={data} setData={(key: keyof ReviewFormInterface, value: number) => setData(key, value)} />;
            case 3:
                return (
                    <RecommendStep
                        recommend={data['recommend']}
                        setRecommend={(value: boolean) => setData('recommend', value)}
                        approveOfCeo={data['approve_of_ceo']}
                        setApproveOfCeo={(value: boolean) => setData('approve_of_ceo', value)}
                        rating={data['rating']}
                        setRating={(value: number) => setData('rating', value)}
                    />
                );
            case 4:
                return (
                    <RateAndReviewStep
                        rating={data['rating']}
                        setRating={(value: number) => setData('rating', value)}
                        review={data['review']}
                        setReview={(value: string) => setData('review', value)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600" onClick={() => setOpen(true)}>
                <Star className="mr-2 h-4 w-4" />
                Write a Review
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
                                {processing ? 'Submitting...' : 'Submit Review'}
                            </Button>
                        )}
                    </div>
                </form>
            </ResponsiveModal>
        </>
    );
}
