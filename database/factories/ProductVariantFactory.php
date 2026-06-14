<?php

namespace Database\Factories;

use App\Models\ProductFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductFactory>
 */
class ProductVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sku' => strtoupper(fake()->bothify('DIV-???-###')),
            'size' => fake()->randomElement(['XS', 'S', 'M', 'L', 'XL']),
            'color' => fake()->randomElement(['Ocean Blue', 'Stealth Black', 'Coral Pink', 'Manta Grey']),
            'stock' => fake()->numberBetween(0, 50),
            'price' => null,
            ];
    }
}
