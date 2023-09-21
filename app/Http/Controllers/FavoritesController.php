<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class FavoritesController extends Controller
{
    public function show(Request $request)
    {
        $email = $request->get('email');

        try {
            $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('No user found in Favorites Show route!', [
                'email' => $email
            ]);

            return response()->json(['products' => '']);
        }

        return response()->json([
            'products' => implode(',', $user->favorites->pluck('slug')->toArray())
        ]);
    }

    public function store(Request $request)
    {
        $email = $request->get('email');
        $productSlug = $request->get('product');

        try {
            $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('No user found in Favorites Store route!', [
                'email' => $email
            ]);

            return response()->json(null, 400);
        }

        try {
            $product = \App\Models\Product::where('slug', $productSlug)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('Syncing product on store', [
                'product' => $productSlug
            ]);

            Artisan::call('app:sync-products');

            try {
                $product = \App\Models\Product::where('slug', $productSlug)->firstOrFail();
            } catch (Exception $exception) {
                Log::error('No product found in Favorites Store route!', [
                    'product' => $productSlug
                ]);
            }

            return response()->json([
                'products' => implode(',', $user->favorites->pluck('slug')->unique()->toArray())
            ]);
        }

        $user->favorites()->syncWithoutDetaching($product);

        return response()->json([
            'products' => implode(',', $user->favorites->pluck('slug')->unique()->toArray())
        ]);
    }

    public function destroy(Request $request)
    {
        $email = $request->get('email');
        $productSlug = $request->get('product');

        try {
            $user = \App\Models\WebflowUser::where('email', $email)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('No user found in Favorites Delete route!', [
                'email' => $email
            ]);

            return response()->json(null, 400);
        }

        try {
            $product = \App\Models\Product::where('slug', $productSlug)->firstOrFail();
        } catch (Exception $exception) {
            Log::error('Syncing product on delete', [
                'product' => $productSlug
            ]);

            Artisan::call('app:sync-products');

            try {
                $product = \App\Models\Product::where('slug', $productSlug)->firstOrFail();
            } catch (Exception $exception) {
                Log::error('No product found in Favorites Delete route!', [
                    'product' => $productSlug
                ]);
            }

            return response()->json([
                'products' => implode(',', $user->favorites->pluck('slug')->unique()->toArray())
            ]);
        }

        $user->favorites()->detach($product);

        return response()->json([
            'products' => implode(',', $user->favorites->pluck('slug')->unique()->toArray())
        ]);
    }
}
