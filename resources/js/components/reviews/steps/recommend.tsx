import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface RecommendStepProps {
    recommend: boolean | null;
    setRecommend: (value: boolean) => void;
    approveOfCeo: boolean | null;
    setApproveOfCeo: (value: boolean) => void;
}

export default function RecommendStep({ recommend, setRecommend, approveOfCeo, setApproveOfCeo }: RecommendStepProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <Label className="text-base font-medium">Would you recommend this company?</Label>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant={recommend === true ? 'default' : 'outline'}
                        className={clsx('flex-1', {
                            'bg-green-600 hover:bg-green-700': recommend === true,
                        })}
                        onClick={() => setRecommend(true)}
                    >
                        <ThumbsUp className="mr-2 h-5 w-5" />
                        Yes, I would
                    </Button>
                    <Button
                        type="button"
                        variant={recommend === false ? 'default' : 'outline'}
                        className={clsx('flex-1', {
                            'bg-red-600 hover:bg-red-700': recommend === false,
                        })}
                        onClick={() => setRecommend(false)}
                    >
                        <ThumbsDown className="mr-2 h-5 w-5" />
                        No, I would not
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-base font-medium">Do you approve of the CEO?</Label>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant={approveOfCeo === true ? 'default' : 'outline'}
                        className={clsx('flex-1', {
                            'bg-green-600 hover:bg-green-700': approveOfCeo === true,
                        })}
                        onClick={() => setApproveOfCeo(true)}
                    >
                        <ThumbsUp className="mr-2 h-5 w-5" />
                        Yes, I approve
                    </Button>
                    <Button
                        type="button"
                        variant={approveOfCeo === false ? 'default' : 'outline'}
                        className={clsx('flex-1', {
                            'bg-red-600 hover:bg-red-700': approveOfCeo === false,
                        })}
                        onClick={() => setApproveOfCeo(false)}
                    >
                        <ThumbsDown className="mr-2 h-5 w-5" />
                        No, I don't approve
                    </Button>
                </div>
            </div>
        </div>
    );
}
