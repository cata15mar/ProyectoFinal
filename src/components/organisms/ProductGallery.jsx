import React from 'react';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';

const ProductGallery = () => {
  const { 
    getPaginatedProducts, 
    currentPage, 
    setCurrentPage, 
    getTotalPages,
    filteredProducts 
  } = useProductStore();
  
  const { agregarAlCarrito } = useCartStore();

  const currentItems = getPaginatedProducts();
  const totalPages = getTotalPages();

  if (filteredProducts.length === 0) {
    return <div className="text-center py-10 text-gray-500">No se encontraron productos.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((prod) => (
          <div key={prod.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col transition-transform hover:scale-[1.02]">
            <img 
              src={`https://picsum.photos/seed/${prod.id}/300/200`} 
              alt={prod.nombre}
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-[10px] font-bold text-blue-500 uppercase">{prod.categoria}</span>
              <h3 className="font-bold text-gray-800 text-sm h-10 line-clamp-2">{prod.nombre}</h3>
              <p className="text-lg font-black text-gray-900 mt-2">${prod.precio.toLocaleString()}</p>
              <button 
                onClick={() => agregarAlCarrito(prod)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-bold transition-colors"
              >
                + Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CONTROLES DE PAGINACIÓN */}
      <div className="flex flex-wrap justify-center items-center gap-2 py-6 border-t border-gray-200">
        <button 
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 font-bold"
        >
          Anterior
        </button>

        <div className="flex gap-1">
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            // Lógica simple para no mostrar 20 botones si hay muchas páginas
            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                    currentPage === pageNum 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return <span key={pageNum} className="px-2 text-gray-400">...</span>;
            }
            return null;
          })}
        </div>

        <button 
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 font-bold"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;