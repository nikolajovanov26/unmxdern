<?php

namespace App\Http\Repositories;

use App\Models\Product;
use App\Models\Rating;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WebflowRepository
{
    const BASEURL = 'https://api.webflow.com/v2';

    public function createReview($review, $author)
    {
        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->withBody(json_encode([
            'fieldData' => [
                'body'    => $review->string,
                'name'    => $author,
                'product' => $review->product->webflow_id,
            ]
        ]))->post(self::BASEURL . '/collections/' . env('REVIEW_COLLECTION_ID') . '/items')
            ->json();

        Log::info('Review Added', [
            'response' => $response
        ]);

        $review->webflow_id = $response['id'];
        $review->save();

        $this->publishItem(env('REVIEW_COLLECTION_ID'), $response['id']);
    }

    public function updateRatings(Rating $rating, Product $product)
    {
        if (!isset($product->webflow_id)) {
            $this->getProductId($product);
            $product = $product->fresh();
        }

        $productData = $this->getProductData($product)['product'];

        $count = $productData['fieldData']['rating-count'];
        $avg = $productData['fieldData']['rating-avg'];

        $newAvg = (($count * $avg) + $rating->rating) / ($count + 1);

        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->withBody(json_encode([
            'publishStatus' => 'live',
            'product'       => [
                'fieldData' => [
                    'rating-count' => $count + 1,
                    'rating-avg'   => $newAvg,
                ],
            ]
        ]))->patch('https://api.webflow.com/v2/sites/' . env('SITE_ID') . '/products/' . $product->webflow_id)
            ->json();

        Log::info('Product updated', [
            'response' => $response
        ]);
    }

    public function getProductId(Product $product)
    {
        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->get(self::BASEURL . '/sites/' . env('SITE_ID') . '/products')
            ->json();

        Log::info('Product received', [
            'response' => $response
        ]);

        try {
            $productId = array_filter($response['items'], function ($item) use ($product) {
                return $item['product']['fieldData']['slug'] == $product->slug;
            })[0]['product']['id'];

            $product->webflow_id = $productId;
            $product->save();

            return $productId;
        } catch (\Exception $exception) {
            Log::error('Product id was not found', [
                'response' => $response
            ]);
        }

        return '';
    }

    private function publishItem($collectionId, $itemId)
    {
        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->withBody(json_encode([
            'itemIds' => [$itemId]
        ]))->post(self::BASEURL . '/collections/' . $collectionId . '/items/publish')
            ->json();

        Log::info('Item published', [
            'response' => $response
        ]);
    }

    public function getProductData(Product $product)
    {
        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->get(self::BASEURL . '/sites/' . env('SITE_ID') . '/products/' . $product->webflow_id)
            ->json();

        Log::info('Product data received', [
            'response' => $response
        ]);

        return $response;
    }
}
