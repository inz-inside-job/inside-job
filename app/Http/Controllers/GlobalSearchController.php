<?php

namespace App\Http\Controllers;

use App\Data\Search\SearchResultData;
use App\Http\Requests\GlobalSearchRequest;
use App\Models\Company;
use App\Models\Job;
use App\Search\GlobalSearch;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GlobalSearchController extends Controller
{
    /**
     * Handle the global search request.
     *
     * @return Response
     */
    public function search(GlobalSearchRequest $request)
    {
        // @codeCoverageIgnoreStart
        $query = $request->validated('query');

        $results = GlobalSearch::search($query)
            ->query(function (Builder $builder) {
                if ($builder->getModel() instanceof Job) {
                    $builder->with('company');
                }
            })
            ->get()
            ->map(function (Model $result) {
                $data = $result->toArray();
                if ($result instanceof Company) {
                    $data['logo'] = $result->logo;
                    $data['link'] = route('companies.show', $result->slug);
                    $data['id'] = "company-{$result->id}";
                } elseif ($result instanceof Job) {
                    $data['name'] = $result->title;
                    $data['logo'] = $result->company->logo;
                    // TODO: Add proper job link when we have job page
                    $data['link'] = '/jobs';
                    $data['id'] = "job-{$result->id}";
                } else {
                    // Unreachable
                    throw new Exception('Unknown model type');
                }

                return SearchResultData::from($data);
            });
        // @codeCoverageIgnoreEnd

        return response()->json($results);
    }
}
