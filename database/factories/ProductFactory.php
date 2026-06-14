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

        $seaWords = [
            'Freediver', 'Carbon Fins', 'Neoprene Suit', 'Silicone Mask', 'Snorkel',
            'Weightbelt', 'Monofin', 'Bi-fins', 'Lanyard', 'Dive Computer', 'Buoy',
            'Line Tracker', 'Apnea', 'Depth Gauge', 'Reef Safe', 'Mermaid Tail',
            'Thermocline', 'Hydrodynamic', 'Saltwater', 'Coral Coast', 'Isla'
        ];
        $baseName = fake()->randomElement($seaWords).' '.fake()->randomElement(['Pro', 'Elite', 'Classic', 'X', 'Series', 'V2']);

        $name = $baseName.' '.strtoupper(fake()->bothify('#??'));
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name), // Converts "Cool Wet Suit" to "cool-wet-suit"
            'description' => $this->faker->paragraph(2), // Generates a 2-sentence description
            'price' => $this->faker->randomFloat(2, 15, 500), // Random price between 15.00 and 500.00
            'stock' => $this->faker->numberBetween(0, 50), // Random stock quantity
        ];
    }
}
