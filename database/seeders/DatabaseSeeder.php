<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $categories = Category::factory()->count(5)->create();

        Product::factory()
            ->count(12)
            ->create()
            ->each(function ($product) use ($categories) {
                $randomCategories = $categories->random(rand(1, 2))->pluck('id');
                $product->categories()->attach($randomCategories);

                ProductImage::factory()
                    ->count(3)
                    ->create([
                        "product_id" => $product->id,
                    ]);
                $product->images()->first()->update(["primary" => true]);
            });



    }
}
