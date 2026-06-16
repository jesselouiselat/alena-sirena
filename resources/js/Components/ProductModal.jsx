import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import ImageCarousel from './ImageCarousel';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductModal({ product, isOpen, onClose }) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative flex w-full max-w-2xl transform flex-col overflow-hidden rounded-lg bg-white text-left align-middle shadow-2xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                  <ImageCarousel product={product}></ImageCarousel>
           
                </div>
                
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <p className="text-2xl text-gray-900">₱{product.price}</p>

                    <div className="mt-6">
                      <div className="flex items-center">
                        {/* <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                4 > rating ? 'text-gray-900' : 'text-gray-200',
                                'size-5 shrink-0',
                              )}
                            />
                          ))}
                        </div> */}
                      </div>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900">Description</h3>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                          {product.description || "No specific details provided for this product description."}
                        </p>
                      </div>

                      <a
                        href={`/products/${product.slug}`}
                        
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 transition"
                      >
                        View Product Details
                      </a>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}