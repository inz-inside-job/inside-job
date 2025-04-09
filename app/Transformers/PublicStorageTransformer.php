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
        return Storage::disk('public')->url($value);
    }
}
