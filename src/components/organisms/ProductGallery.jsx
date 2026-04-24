import React, { useEffect } from 'react';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';

const ProductGallery = () => {
  const { 
    getPaginatedProducts, 
    currentPage, 
    setCurrentPage, 
    getTotalPages,
    fetchProducts,
    loading,
    filteredProducts
  } = useProductStore();
  
  const { agregarAlCarrito } = useCartStore();

  // Cargamos los productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const currentItems = getPaginatedProducts();
  const totalPages = getTotalPages();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="font-black text-blue-600 animate-pulse uppercase tracking-widest text-sm">
          Cargando catálogo real...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentItems.map((prod) => (
          <div 
            key={prod.id} 
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-4 group"
          >
            <div className="h-44 mb-4 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2">
              <img 
                src={prod.image} 
                alt={prod.title} 
                className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col flex-grow">
              <span className="text-[10px] font-black text-blue-500 uppercase mb-1 tracking-wider">
                {prod.category}
              </span>
              <h3 className="font-bold text-gray-800 text-sm h-10 line-clamp-2 leading-tight">
                {prod.title}
              </h3>
              <div className="mt-auto pt-4">
                <p className="text-2xl font-black text-gray-900">
                  ${prod.price.toLocaleString()}
                </p>
                <button 
                  onClick={() => agregarAlCarrito({ 
                    id: prod.id, 
                    nombre: prod.title, 
                    precio: prod.price, 
                    categoria: prod.category 
                  })}
                  className="mt-4 w-full bg-blue-600 hover:bg-black text-white py-3 rounded-xl text-xs font-black transition-colors shadow-lg shadow-blue-100"
                >
                  AÑADIR AL PEDIDO
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SECCIÓN DE PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 py-8 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {/* Botón Anterior */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              ⬅️
            </button>

            {/* Números de Página */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Lógica para mostrar solo algunas páginas si hay muchas
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                          : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-400'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              ➡️
            </button>
          </div>
          
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Página {currentPage} de {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;