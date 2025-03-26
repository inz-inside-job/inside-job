<?php

namespace App\Transformers;

use Illuminate\Support\Facades\Storage;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Support\Transformation\TransformationContext;
use Spatie\LaravelData\Transformers\Transformer;

class PublicStorageTransformer implements Transformer
{
    public function transform(DataProperty $property, mixed $value, TransformationContext $context): mixed
    {
        if (! $value) {
            return null;
        }

        // Check if it's already a full URL
        if (str_starts_with($value, Storage::disk('public')->url(''))) {
            return $value;
        }

        return Storage::disk('public')->url($value);
    }
}
