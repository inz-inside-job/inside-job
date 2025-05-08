<?php

declare(strict_types=1);

namespace App\PHPStan\Rules;

use PhpParser\Node;
use PhpParser\Node\Stmt\ClassMethod;
use PhpParser\Node\Stmt\Function_;
use PHPStan\Analyser\Scope;
use PHPStan\Rules\Rule;
use PHPStan\Rules\RuleErrorBuilder;
use PHPStan\ShouldNotHappenException;

/**
 * @implements Rule<Node>
 */
class FunctionLengthRule implements Rule
{
    private const MAX_LINES = 30;

    public function getNodeType(): string
    {
        return Node::class; // Important: we want to process both Function_ and ClassMethod
    }

    /**
     * @throws ShouldNotHappenException
     */
    public function processNode(Node $node, Scope $scope): array
    {
        if (! ($node instanceof Function_ || $node instanceof ClassMethod)) {
            return [];
        }

        if ($node->getStartLine() === -1 || $node->getEndLine() === -1) {
            return [];
        }

        $lineCount = $node->getEndLine() - $node->getStartLine() + 1;

        if ($lineCount > self::MAX_LINES) {
            $name = $node->name->toString();

            return [
                RuleErrorBuilder::message(sprintf(
                    'Function "%s" has %d lines, exceeding the limit of %d.',
                    $name,
                    $lineCount,
                    self::MAX_LINES
                ))->identifier('app.functionLength')->line($node->getStartLine())->build(),
            ];
        }

        return [];
    }
}
