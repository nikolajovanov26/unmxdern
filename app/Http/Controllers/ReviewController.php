<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\WebflowUser;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    public function __invoke(Request $request)
    {
        $email = $request->get('email');
        $content = $request->get('content');
        $url = $request->get('url');

        try {
            $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();

        } catch (Exception $exception) {
            Log::error('No user found!', [
                'email' => $email
            ]);

            return response()->json(null, 400);
        }

        try {
            $product = \App\Models\Product::where('slug', $url)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('Syncing product on store', [
                'product' => $url
            ]);

            Artisan::call('app:sync-products');

            try {
                $product = \App\Models\Product::where('slug', $url)->firstOrFail();
            } catch (Exception $exception) {
                Log::error('No product found in Favorites Store route!', [
                    'product' => $url
                ]);
            }

            return response()->json(null, 400);
        }

        $review = \App\Models\Review::create([
            'webflow_user_id' => $user->id,
            'product_id'      => $product->id,
            'string'          => $content
        ]);

        $author = $user->name ?? $user->email ?? '';

        (new \App\Http\Repositories\WebflowRepository())->createReview($review, $author);

        return response()->json(['message' => 'Review added'], 200);
    }
}
