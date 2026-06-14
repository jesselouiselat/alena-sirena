'use client'

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'

export default function FlyoverMenu({ categories, navigation }) {
  return (
    <div className="bg-white">
      {/* Flyout menus */}
      <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                        {navigation && navigation.pages && navigation.pages.map((page) => (
            <a
              key={page.name}
              href={page.href}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              {page.name}
            </a>
          ))}
          {categories.map((category) => (
            <Popover key={category.id} className="flex">
              <div className="relative flex">
                <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
                  {category.name}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                  />
                </PopoverButton>
              </div>

              <PopoverPanel
                transition
                className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="py-10">
                    
                    {/* The Flex Row Layout Track */}
                    <div className="flex flex-row items-start gap-x-8 overflow-x-auto pb-4 scrollbar-thin">
                      {category.products && category.products.map((product) => {
                        
                  
                        return (
                          <div key={product.id} className="group relative text-base sm:text-sm w-56 shrink-0">
                            <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden shadow-sm border border-gray-50">
                              <img
                                alt={product.name}
                                src={product.images[0].image_path}
                                className="h-full w-full object-cover group-hover:opacity-75 transition duration-200 ease-in-out"
                              />
                            </div>
                            
                            {/* Dynamically bind product details link path maps */}
                            <a href={`/products/${product.slug}`} className="mt-4 block font-semibold text-gray-900 truncate">
                              <span aria-hidden="true" className="absolute inset-0 z-10" />
                              {product.name}
                            </a>
                            
                            <p className="mt-1 text-sm font-medium text-indigo-600">
                              ₱{Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                            
                            <p aria-hidden="true" className="mt-1 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          ))}

    
        </div>
      </PopoverGroup>
    </div>
  )
}