<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/test', function (Request $request) {
    return response()->json(implode(',', $request->all()), 200);
});

Route::post('/review', function (Request $request) {

//    $email = $request->get('email');
//    $isValid = $request->get('isValid');
//    $content = $request->get('content');
//    $url = $request->get('url');
//    $ip = $request->get('ip');
//
    Log::error('data', [
        'data' => $request->all()
    ]);

//    if (!$isValid) {
//        try {
//            $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
//        } catch (Exception $exception) {
//            try {
//                $user = \App\Models\WebflowUser::where('ip_address', $ip)->firstOrFail();
//            } catch (Exception $exception) {
//                response()->json(null, 403);
//            }
//        }
//    }
//
//    $product = \App\Models\Product::firstWhere('slug', $url);
//
//    if (!isset($product)) {
//        // create product
//    }
//
    $review = \App\Models\Review::create([
        'webflow_user_id' => 1,
        'product_id'      => 1,
        'string'          => implode(',', $request->all())
    ]);
//
//    $author = $user->name ?? 'NAME!';
//
//    (new \App\Http\Repositories\WebflowRepository())->createReview($review, $author);
//
    return response()->json(['message' => 'Review added'], 200);
});
