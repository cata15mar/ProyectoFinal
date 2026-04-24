import React from 'react';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';

const ProductGallery = () => {
  const { filteredProducts } = useProductStore();
  const { agregarAlCarrito } = useCartStore();

  return (
    <div className="container mx-auto p-4">
      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div 
            key={prod.id} 
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Imagen del producto */}
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src={`https://picsum.photos/seed/${prod.id}/300/200`} 
                alt={prod.nombre}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Contenido de la Card */}
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {prod.categoria}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mt-1 line-clamp-2">
                {prod.nombre}
              </h3>
              <p className="text-xl font-extrabold text-gray-900 mt-2">
                ${prod.precio.toLocaleString()}
              </p>
              
              <button 
                onClick={() => agregarAlCarrito(prod)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>Añadir</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="C12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-xl">No se encontraron productos.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;