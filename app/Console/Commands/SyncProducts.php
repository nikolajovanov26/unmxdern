<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SyncProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:sync-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::withHeaders([
            'accept'        => 'application/json',
            'authorization' => 'Bearer ' . env('WEBFLOW_KEY'),
        ])->get('https://api.webflow.com/v2/sites/' . env('SITE_ID') . '/products')
            ->json();

        foreach ($response['items'] as $item) {
            Product::updateOrCreate(
                [
                    'slug' => $item['product']['fieldData']['slug'],
                ],
                [
                    'webflow_id' => $item['product']['id'],
                    'name'       => $item['product']['fieldData']['name'],
                ]
            );
        }
    }
}
