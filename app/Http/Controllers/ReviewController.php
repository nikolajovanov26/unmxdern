<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\WebflowUser;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    public function __invoke(Request $request)
    {
        $email = $request->get('email');
//        $isValid = $request->get('isValid');
        $isValid = true;
        $content = $request->get('content');
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
                'webflow_id' => '64d957a1399cb463eb5bdf3e',
                'name' => 'Product name',
                'slug' => $url
            ]);
        }

        $review = \App\Models\Review::create([
            'webflow_user_id' => $user->id,
            'product_id'      => $product->id,
            'string'          => $content
        ]);

        $author = $user->name ?? 'NAME!';

        (new \App\Http\Repositories\WebflowRepository())->createReview($review, $author);

        return response()->json(['message' => 'Review added'], 200);
    }
}
