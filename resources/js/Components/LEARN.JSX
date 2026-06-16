import { useState, useMemo } from 'react'
import ImageCarousel from '@/Components/ImageCarousel'

// Dictionary to map backend text entries to Tailwind layout styles
const colorClassMap = {
  'Ocean Blue': 'bg-blue-600',
  'Manta Grey': 'bg-gray-500',
  'Coral Pink': 'bg-rose-400',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ShowProduct({ product }) {
  // 1. Parse unique color variations dynamically from the variant rows
  const uniqueColors = useMemo(() => {
    if (!product.variants) return []
    const seen = new Set()
    return product.variants
      .filter(v => {
        if (!v.color || seen.has(v.color)) return false
        seen.add(v.color)
        return true
      })
      .map(v => ({
        name: v.color,
        classes: colorClassMap[v.color] || 'bg-gray-400'
      }))
  }, [product.variants])

  // 2. Local reactive states initialized directly using variant array properties
  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]?.name || '')
  const [selectedSize, setSelectedSize] = useState('')

  // 3. Compute structural sizes matching the currently chosen active color
  const sizesForSelectedColor = useMemo(() => {
    if (!product.variants) return []
    
    return product.variants
      .filter(v => v.color === selectedColor)
      .map(v => ({
        name: v.size,
        inStock: v.stock > 0,
        stock: v.stock,
        sku: v.sku
      }))
  }, [product.variants, selectedColor])

  // 4. Track matching record array indices for submission properties
  const activeVariant = useMemo(() => {
    return product.variants?.find(v => v.color === selectedColor && v.size === selectedSize)
  }, [product.variants, selectedColor, selectedSize])

  return (
    <div className="bg-white">
      <div className="pt-6">
        
        {/* Breadcrumbs Category Track List */}
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900 hover:underline">
                  Shop
                </a>
                <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            {product.categories?.map((category) => (
              <li key={category.id}>
                <div className="flex items-center">
                  <a href={`/categories/${category.slug}`} className="mr-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                    {category.name}
                  </a>
                  <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <span aria-current="page" className="font-medium text-gray-400 select-none">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Display Content Segment Frame Layout */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          
          {/* Main Visual Column */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            
            <div className="mt-6 max-w-xl">
              <ImageCarousel product={product} />
            </div>
          </div>

          {/* Options Interaction Action Panel Sidebar */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">₱{product.price}</p>

            <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
              {/* Variant Group Selection: Colors */}
              {uniqueColors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color: <span className="font-semibold text-gray-700">{selectedColor}</span></h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <div className="flex items-center gap-x-3">
                      {uniqueColors.map((color) => (
                        <div 
                          key={color.name} 
                          className={classNames(
                            selectedColor === color.name ? 'ring-2 ring-indigo-500 ring-offset-2' : '',
                            "flex rounded-full outline -outline-offset-1 outline-black/10 transition-all"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedColor(color.name)
                              setSelectedSize('') 
                            }}
                            aria-label={color.name}
                            className={classNames(
                              color.classes,
                              'size-8 rounded-full forced-color-adjust-none cursor-pointer border-none p-0',
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {/* Variant Group Selection: Sizes */}
              {sizesForSelectedColor.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      Size: {selectedSize || <span className="text-gray-400 font-normal">Choose a size</span>}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {activeVariant ? `Stock: ${activeVariant.stock} available` : ''}
                    </span>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="grid grid-cols-4 gap-3">
                      {sizesForSelectedColor.map((size) => (
                        <button
                          key={size.name}
                          type="button"
                          disabled={!size.inStock}
                          onClick={() => setSelectedSize(size.name)}
                          className={classNames(
                            size.inStock ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-25 bg-gray-200 line-through',
                            selectedSize === size.name ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700' : 'border-gray-300 bg-white text-gray-900',
                            "group relative flex items-center justify-center rounded-md border p-3 text-sm font-medium uppercase transition-all"
                          )}
                        >
                          <span>{size.name}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {/* Add To Cart Form Submission Trigger */}
              <button
                type="submit"
                disabled={!selectedSize || (activeVariant && activeVariant.stock === 0)}
                className={classNames(
                  (!selectedSize || activeVariant?.stock === 0) 
                    ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                  "mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white transition focus:outline-hidden"
                )}
              >
                {!selectedSize ? 'Select a Size' : activeVariant?.stock === 0 ? 'Out of Stock' : 'Add to bag'}
              </button>

              {activeVariant?.sku && (
                <p className="mt-3 text-center text-xs text-gray-400">SKU: {activeVariant.sku}</p>
              )}
            </form>
          </div>

          {/* Core Footer Info Segment Area */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}