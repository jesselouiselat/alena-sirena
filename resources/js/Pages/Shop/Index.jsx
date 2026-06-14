import React from 'react';

export default function Index({ products }) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Our Shop Catalog</h1>
            
            {products.length === 0 ? (
                <p className="text-gray-500">No products found. Time to seed some data!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-sm bg-white">
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-600 my-2">{product.description}</p>
                            <span className="text-emerald-600 font-bold">${product.price}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}