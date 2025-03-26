'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    readOnly?: boolean;
    onRatingChange?: (rating: number) => void;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function StarRating({ rating, maxRating = 5, readOnly = false, onRatingChange, size = 'md', className = '' }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const starSize = sizeClasses[size];

    const handleMouseEnter = (index: number) => {
        if (!readOnly) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverRating(0);
        }
    };

    const handleClick = (index: number) => {
        if (!readOnly && onRatingChange) {
            onRatingChange(index);
        }
    };

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating;

                return (
                    <Star
                        key={index}
                        className={`${starSize} ${
                            isFilled ? 'fill-primary text-primary' : 'text-muted-foreground'
                        } transition-colors ${!readOnly ? 'cursor-pointer' : ''}`}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starValue)}
                        aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
                        data-state={isFilled ? 'filled' : 'empty'}
                        role={!readOnly ? 'button' : 'presentation'}
                        tabIndex={!readOnly ? 0 : -1}
                    />
                );
            })}
        </div>
    );
}
