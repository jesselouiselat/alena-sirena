<?php

namespace App\Filament\Resources\Users\RelationManagers;

use App\Filament\Resources\CartItems\CartItemResource;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class CartItemRelationManager extends RelationManager
{
    protected static string $relationship = 'cartItem';

    protected static ?string $relatedResource = CartItemResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
