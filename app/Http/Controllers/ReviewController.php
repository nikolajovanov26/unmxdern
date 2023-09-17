<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __invoke(Request $request)
    {
        $email = $request->get('email');
        $isValid = $request->get('isValid');
        $content = $request->get('content');
        $url = $request->get('url');
        $ip = $request->get('ip');

        if (!$isValid) {
            try {
                $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
            } catch (Exception $exception) {
                try {
                    $user = \App\Models\WebflowUser::where('ip_address', $ip)->firstOrFail();
                } catch (Exception $exception) {
                    response()->json(null, 403);
                }
            }
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
