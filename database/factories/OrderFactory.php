<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            "user_id" => User::factory(),
            "order_number" => "AS-".now()->year."-".fake()->unique()->numberBetween(10000, 99999),
            "status" => fake()->randomElement(([
                "pending", "confirmed", "shipped", "delivered", "cancelled"
            ])),
            "subtotal" => fake()->randomFloat(2, 2000, 3000),
            "shipping_fee" => fake()->randomFloat(2, 200, 800),
            "payment_method" => fake()->randomElement(["gcash", "maya", "bdo", "bpi"]),
            "payment_status" => fake()->randomElement(["paid", "unpaid"]),
            "payment_id" => 'ch_'.fake()->unique()->numberBetween(1, 100000),
            "notes" => fake()->paragraph(2),

        ];
    }


}
