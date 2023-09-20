<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('favorite_product', function (Blueprint $table) {
            $table->foreignId('webflow_user_id')->references('id')->on('webflow_users');
            $table->foreignId('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('favorite_product', function (Blueprint $table) {
            $table->dropConstrainedForeignId('webflow_user_id');
            $table->dropConstrainedForeignId('product_id');
        });
    }
};
