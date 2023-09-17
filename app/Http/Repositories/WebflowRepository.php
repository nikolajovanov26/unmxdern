<?php

namespace App\Http\Repositories;

use App\Models\Review;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WebflowRepository
{
    const BASEURL = 'https://api.webflow.com/beta';

    public function createReview($review, $author)
    {
        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->withBody(json_encode([
            'fieldData' => [
                'body'    => $review->string ?? 'no recieved',
                'name'    => $author,
                'product' => '64d957a1399cb463eb5bdfc1',
            ]
        ]))->post(self::BASEURL . '/collections/' . env('REVIEW_COLLECTION_ID') . '/items')
            ->json();

        Log::info('Review Added', [
            'response' => $response
        ]);

        $review->webflow_id = $response->id;
        $review->save();

        $this->publishItem(env('REVIEW_COLLECTION_ID'), $response->id);
    }

    public function publishItem($collectionId, $itemId)
    {
        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->withBody(json_encode([
            'itemIds' => [$itemId]
        ]))->post(self::BASEURL . '/collections/' . $collectionId . '/items/publish')
            ->json();

        Log::info('Item Published', [
            'response' => $response
        ]);
    }
}
