<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function index()
    {
        return Inertia::render('Shop/Home', [
            'products' => Product::with(["images", "categories"])->get(), // Passing your 12 seeded database products here!
            'categories' => Category::with("products.images")->get()
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('Shop/ShowProductPage', [
            "product" => $product->load(["categories", "images", "variants"]),
            'categories' => Category::with("products.images")->get()
        ]);

    }
}

