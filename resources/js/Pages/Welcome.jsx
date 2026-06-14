import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, products }) {
    return (
        <>
            <Head title="Welcome to Alena Sirena" />
            
            {/* Top Navigation Bar */}
            <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
                <span className="text-xl font-bold tracking-wider text-blue-600">ALENA SIRENA</span>
                <div className="space-x-4">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-gray-700 hover:text-blue-600">Log in</Link>
                            <Link href={route('register')} className="ml-4 text-gray-700 hover:text-blue-600">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Main Product Catalog Layout */}
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Featured Gear</h1>

        <div className="grid grid-cols-3 gap-6 p-6">
            {products.map((product) => {
                // 💡 Added optional chaining (?.) so it won't crash if a product has no images array
                const primaryImage = product.images?.find(img => img.primary === 1) 
                                   || product.images?.[0]; 

                return (
                    <div key={product.id} className="bg-white rounded-xl shadow p-4">
                        {primaryImage && (
                            <img 
                                src={primaryImage.image_path} 
                                alt={product.name} 
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        )}

                        <h2 className="mt-4 font-bold text-xl">{product.name}</h2>
                        <p className="text-emerald-600 font-semibold mt-1">${product.price}</p>
                        
                        {/* 💡 Added optional chaining (?.) for safety here too */}
                        <div className="flex gap-2 mt-2">
                            {product.categories?.map(category => (
                                <span key={category.id} className="bg-gray-100 text-xs px-2 py-1 rounded">
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
            </main>
        </>
    );
}