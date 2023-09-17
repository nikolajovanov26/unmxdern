<?php

namespace App\Http\Repositories;

use App\Models\Review;
use Illuminate\Support\Facades\Http;

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
                'body' => $review->content,
                'name' => $author,
                'product' => '64d957a1399cb463eb5bdf3e',
            ]
        ]))->post(self::BASEURL . '/collections/' . env('REVIEW_COLLECTION_ID') . '/items')
            ->json();

        $review->webflow_id = $response->id;
        $review->save();

//        $this->publishItem(env('REVIEW_COLLECTION_ID'), $response->id);
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
    }
}
