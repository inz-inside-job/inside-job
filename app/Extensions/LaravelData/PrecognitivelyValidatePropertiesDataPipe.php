<?php

namespace App\Extensions\LaravelData;

use Illuminate\Foundation\Precognition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\LaravelData\DataPipes\ValidatePropertiesDataPipe;
use Spatie\LaravelData\Support\Creation\CreationContext;
use Spatie\LaravelData\Support\DataClass;

class PrecognitivelyValidatePropertiesDataPipe extends ValidatePropertiesDataPipe
{
    public function handle(
        mixed $payload,
        DataClass $class,
        array $properties,
        CreationContext $creationContext
    ): array {
        if ($payload instanceof Request && $payload->isPrecognitive()) {
            Validator::make(
                $properties,
                $payload->filterPrecognitiveRules(($class->name)::getValidationRules($properties)),
            )
                ->after(Precognition::afterValidationHook($payload))
                ->validate();
        }

        return parent::handle($payload, $class, $properties, $creationContext);
    }
}
