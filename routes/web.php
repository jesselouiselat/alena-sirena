<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', ['categories' => Category::with(["products.images"])->get()]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get("/products/{product:slug}", [ProductController::class, "show"])->name("products.show");

Route::get("/categories/{category:slug}", [CategoryController::class, "index"])->named("category.show");

Route::get("/checkout", [OrderController::class, "show"])->middleware(["auth"])->name("order.show");

Route::get('/', [ProductController::class, 'index'])->name('home');


require __DIR__.'/auth.php';
