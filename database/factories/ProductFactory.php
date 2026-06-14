<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true); // Generates a 3-word product name

        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name), // Converts "Cool Wet Suit" to "cool-wet-suit"
            'description' => $this->faker->paragraph(2), // Generates a 2-sentence description
            'price' => $this->faker->randomFloat(2, 15, 500), // Random price between 15.00 and 500.00
            'stock' => $this->faker->numberBetween(0, 50), // Random stock quantity
        ];
    }
}
