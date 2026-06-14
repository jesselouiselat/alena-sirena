<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
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

        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $categories = Category::factory()->count(5)->create();

        $products = Product::factory()
            ->count(12)
            ->has(ProductVariant::factory()->count(3), "variants")
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

        Order::factory()
            ->count(2)
            ->create(["user_id" => $testUser->id])
            ->each(function ($order) use ($products) {
                $randomProducts = $products->random(2);

                foreach ($randomProducts as $product) {
                    $variants = $product->variants()->first();

                    OrderItem::factory()->create([
                        "order_id" => $order->id,
                        "product_id" => $product->id,
                        "product_variant_id" => $variants->id,
                        "product_name" => $product->name,
                        "price" => $product->price,
                        "quantity" => 2,
                        "subtotal" => $product->price * 2,
                    ]);
                }
                $order->update(["subtotal" => $order->orderItem()->sum("subtotal")]);
            });
    }
}
