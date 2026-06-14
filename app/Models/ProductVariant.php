<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductVariant extends Model
{


    protected $fillable = [
        "product_id",
        "sku",
        "size",
        "color",
        "price",
        "stock"

    ];

    use HasFactory;
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function orderItem(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function cartItem(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

}
