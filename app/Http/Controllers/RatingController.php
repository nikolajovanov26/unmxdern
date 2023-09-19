<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\WebflowUser;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RatingController extends Controller
{
    public function __invoke(Request $request)
    {
        $email = $request->get('email');
//        $isValid = $request->get('isValid');
        $isValid = true;
        $rating = $request->get('rating');
        $url = $request->get('url');
        $ip = $request->get('ip');

        try {
            if ($isValid) {
                $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
            } else {
                $user = \App\Models\WebflowUser::where('ip_address', $ip)->firstOrFail();
            }

        } catch (Exception $exception) {
            Log::error('No user found!');

            $user = WebflowUser::first();
        }

        $product = \App\Models\Product::firstWhere('slug', $url);

        if (!isset($product)) {
            $product = Product::create([
                'name' => 'Product name',
                'slug' => $url
            ]);
        }

        $rating = \App\Models\Rating::create([
            'webflow_user_id' => $user->id,
            'product_id'      => $product->id,
            'rating'          => $rating
        ]);

        (new \App\Http\Repositories\WebflowRepository())->updateRatings($rating, $product);

        return response()->json(['message' => 'Review posted'], 200);
    }
}
