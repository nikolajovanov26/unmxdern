<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavoritesController extends Controller
{
    public function show(Request $request)
    {
        $email = $request->get('email');

        try {
            $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('No user found in Favorites Show route!');

            return response()->json(['products' => '']);
        }

        return response()->json([
            'products' => implode(',', $user->favorites->pluck('slug')->toArray())
        ]);
    }

    public function store(Request $request)
    {
        $email = $request->get('email');
        $product = $request->get('product');

        try {
            $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('No user found in Favorites Show route!');

            return response()->json(null, 400);
        }

        try {
            $product = \App\Models\Product::where('slug', $product)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('No user found in Favorites Show route!');

            return response()->json(null, 400);
        }

        $user->favorites()->syncWithoutDetaching($product);

        return response()->json([
            'products' => implode(',', $user->favorites->pluck('slug')->toArray())
        ]);
    }
}
