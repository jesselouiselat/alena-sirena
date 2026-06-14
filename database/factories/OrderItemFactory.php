<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $price = fake()->randomFloat(2, 1500, 15000);
        $quantity = fake()->randomNumber(1, 4);
        return [
            "order_id" => Order::factory(),
            "product_id" => Product::factory(),
            "product_variant_id" => ProductVariant::factory(),
            "product_name" => fake()->randomElement(['Freediver Fins', 'Carbon Blade', 'Silicone Mask']),
            "price" => $price,
            "quantity" => $quantity,
            "subtotal" => $price * $quantity,
        ];
    }
}
