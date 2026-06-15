import { useState } from 'react';
import Show from './ProductModal';

export default function ProductsGrid({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = (product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenModal(product)}
              className="group relative cursor-pointer"
            >
              {(() => {
                const primaryImg = product.images?.find(img => img.primary === 1) || product.images?.[0]
                return (
                  <img
                    alt={product.slug}
                    src={primaryImg?.image_path || '/images/placeholder.jpg'}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                )
              })()}

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <div>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </div>
                  </h3>
                  
                  {product.categories?.map((category) => (
                    <div key={category.id}>
                      <p className="mt-1 text-sm text-gray-500">{category.name}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-900">₱{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Show
        product={selectedProduct} 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}