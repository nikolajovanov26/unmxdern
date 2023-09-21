<?php

namespace App\Http\Controllers;

use App\Http\Repositories\WebflowRepository;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class VariantImageController extends Controller
{
    public function __invoke()
    {
//        $productSlug = $request->get('product');
        $productSlug = Product::first()->slug;

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
        }

        $data = (new WebflowRepository())->getProductData($product);

        foreach ($data['skus'] as $variant) {
            $results[] = [
                'name' => Str::afterLast($variant['fieldData']['name'], ': '),
                'url'  => $variant['fieldData']['main-image']['url'],
            ];
        }

        return $results;
    }
}
