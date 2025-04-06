import clsx from 'clsx';

export default function ProgressSteps({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
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
