import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // 🌟 Make sure you have heroicons installed

export default function ImageCarousel({ product }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!product || !product.images || product.images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <img src="/images/placeholder.jpg" alt="Placeholder" className="w-full h-full object-cover rounded-lg" />
      </div>
    );
  }

  const totalImages = product.images.length;

  const handlePrevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImgIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100 group">
        <img
          src={product.images?.[currentImgIndex]?.image_path || '/images/placeholder.jpg'}
          alt={`${product.name} view ${currentImgIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300 select-none"
        />

        {totalImages > 1 && (
          <>
            {/* Left Button */}
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition opacity-100 lg:opacity-0 lg:group-hover:opacity-100 z-10"
            >
              <ChevronLeftIcon className="size-5 stroke-2" />
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition opacity-100 lg:opacity-0 lg:group-hover:opacity-100 z-10"
            >
              <ChevronRightIcon className="size-5 stroke-2" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-xs z-10">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`size-2 rounded-full transition-all p-0 border-none ${
                    idx === currentImgIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto py-1">
        {product.images.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setCurrentImgIndex(index)}
            className={`relative shrink-0 w-16 h-16 rounded border-2 transition ${
              index === currentImgIndex ? 'border-indigo-600 opacity-100 scale-95' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <img src={img.image_path} alt="" className="w-full h-full object-cover rounded-sm" />
            
            {img.primary === 1 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-[9px] text-white px-1 rounded-bl">
                Cover
              </span>
            )}
          </button>
        ))}
      </div>
    </>
  );
}