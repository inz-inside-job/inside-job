import type React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Star, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { useState } from 'react';

// Star Rating Component
function StarRating({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                    <Star className={`h-6 w-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`} />
                </button>
            ))}
        </div>
    );
}

export default function ReviewModal() {
    const [open, setOpen] = useState(false);
    const [pros, setPros] = useState<string[]>(['']);
    const [cons, setCons] = useState<string[]>(['']);
    const [position, setPosition] = useState('');
    const [workLifeBalance, setWorkLifeBalance] = useState(3);
    const [cultureValues, setCultureValues] = useState(3);
    const [careerOpportunities, setCareerOpportunities] = useState(3);
    const [compensationBenefits, setCompensationBenefits] = useState(3);
    const [seniorManagement, setSeniorManagement] = useState(3);
    const [recommend, setRecommend] = useState<boolean | null>(null);
    const [approveOfCeo, setApproveOfCeo] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addPro = () => {
        setPros([...pros, '']);
    };

    const addCon = () => {
        setCons([...cons, '']);
    };

    const updatePro = (index: number, value: string) => {
        const newPros = [...pros];
        newPros[index] = value;
        setPros(newPros);
    };

    const updateCon = (index: number, value: string) => {
        const newCons = [...cons];
        newCons[index] = value;
        setCons(newCons);
    };

    const removePro = (index: number) => {
        const newPros = [...pros];
        newPros.splice(index, 1);
        setPros(newPros.length ? newPros : ['']);
    };

    const removeCon = (index: number) => {
        const newCons = [...cons];
        newCons.splice(index, 1);
        setCons(newCons.length ? newCons : ['']);
    };

    const resetForm = () => {
        setPros(['']);
        setCons(['']);
        setPosition('');
        setWorkLifeBalance(3);
        setCultureValues(3);
        setCareerOpportunities(3);
        setCompensationBenefits(3);
        setSeniorManagement(3);
        setRecommend(null);
        setApproveOfCeo(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that recommend and approveOfCeo are not null
        if (recommend === null || approveOfCeo === null) {
            alert('Please answer all questions before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Filter out empty pros and cons
            // const filteredPros = pros.filter((pro) => pro.trim() !== '');
            //const filteredCons = cons.filter((con) => con.trim() !== '');

            /*const reviewData = {
                pros: filteredPros,
                cons: filteredCons,
                position,
                work_life_balance: workLifeBalance,
                culture_values: cultureValues,
                career_opportunities: careerOpportunities,
                compensation_benefits: compensationBenefits,
                senior_management: seniorManagement,
                recommend,
                approve_of_ceo: approveOfCeo,
            };*/

            //await submitReview(reviewData);

            // Close modal and reset form
            setOpen(false);
            resetForm();

            // Show success message
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen);
                if (!newOpen) resetForm();
            }}
        >
            <DialogTrigger asChild>
                <Button size="lg">Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>Share your experience working at this company</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div>
                        <Label htmlFor="position" className="text-base font-medium">
                            Your Position
                        </Label>
                        <Input
                            id="position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="e.g. Software Engineer"
                            required
                            className="mt-1"
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base font-medium">Pros</Label>
                        {pros.map((pro, index) => (
                            <div key={`pro-${index}`} className="flex items-center gap-2">
                                <Input
                                    value={pro}
                                    onChange={(e) => updatePro(index, e.target.value)}
                                    placeholder="What did you like about working here?"
                                    className="flex-1"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removePro(index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addPro} className="mt-2">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Pro
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base font-medium">Cons</Label>
                        {cons.map((con, index) => (
                            <div key={`con-${index}`} className="flex items-center gap-2">
                                <Input
                                    value={con}
                                    onChange={(e) => updateCon(index, e.target.value)}
                                    placeholder="What didn't you like about working here?"
                                    className="flex-1"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeCon(index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addCon} className="mt-2">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Con
                        </Button>
                    </div>

                    <div className="space-y-6 pt-2">
                        <h3 className="text-lg font-medium">Rate the Company</h3>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="work-life-balance">Work-Life Balance</Label>
                                <div className="flex items-center justify-between">
                                    <StarRating rating={workLifeBalance} setRating={setWorkLifeBalance} />
                                    <span className="font-medium">{workLifeBalance}/5</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="culture-values">Culture & Values</Label>
                                <div className="flex items-center justify-between">
                                    <StarRating rating={cultureValues} setRating={setCultureValues} />
                                    <span className="font-medium">{cultureValues}/5</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="career-opportunities">Career Opportunities</Label>
                                <div className="flex items-center justify-between">
                                    <StarRating rating={careerOpportunities} setRating={setCareerOpportunities} />
                                    <span className="font-medium">{careerOpportunities}/5</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="compensation-benefits">Compensation & Benefits</Label>
                                <div className="flex items-center justify-between">
                                    <StarRating rating={compensationBenefits} setRating={setCompensationBenefits} />
                                    <span className="font-medium">{compensationBenefits}/5</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="senior-management">Senior Management</Label>
                                <div className="flex items-center justify-between">
                                    <StarRating rating={seniorManagement} setRating={setSeniorManagement} />
                                    <span className="font-medium">{seniorManagement}/5</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-2">
                        <div className="space-y-4">
                            <Label className="text-base font-medium">Would you recommend this company?</Label>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant={recommend === true ? 'default' : 'outline'}
                                    className={`flex-1 ${recommend === true ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                    onClick={() => setRecommend(true)}
                                >
                                    <ThumbsUp className="mr-2 h-5 w-5" />
                                    Yes, I would recommend
                                </Button>
                                <Button
                                    type="button"
                                    variant={recommend === false ? 'default' : 'outline'}
                                    className={`flex-1 ${recommend === false ? 'bg-red-600 hover:bg-red-700' : ''}`}
                                    onClick={() => setRecommend(false)}
                                >
                                    <ThumbsDown className="mr-2 h-5 w-5" />
                                    No, I would not recommend
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-base font-medium">Do you approve of the CEO?</Label>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant={approveOfCeo === true ? 'default' : 'outline'}
                                    className={`flex-1 ${approveOfCeo === true ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                    onClick={() => setApproveOfCeo(true)}
                                >
                                    <ThumbsUp className="mr-2 h-5 w-5" />
                                    Yes, I approve
                                </Button>
                                <Button
                                    type="button"
                                    variant={approveOfCeo === false ? 'default' : 'outline'}
                                    className={`flex-1 ${approveOfCeo === false ? 'bg-red-600 hover:bg-red-700' : ''}`}
                                    onClick={() => setApproveOfCeo(false)}
                                >
                                    <ThumbsDown className="mr-2 h-5 w-5" />
                                    No, I don't approve
                                </Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
