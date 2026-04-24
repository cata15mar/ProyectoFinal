import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

const ShoppingCart = () => {
  const { 
    carrito, 
    eliminarDelCarrito, 
    actualizarCantidad, 
    obtenerTotal, 
    vaciarCarrito 
  } = useCartStore();
  
  const navigate = useNavigate();

  if (carrito.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
        <p className="text-gray-400 text-5xl mb-4">🛒</p>
        <h3 className="text-xl font-bold text-gray-800">Tu carrito está vacío</h3>
        <p className="text-gray-500 mt-2">¡Agrega algunos productos tecnológicos para comenzar!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* HEADER DEL CARRITO */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="text-xl font-black text-gray-800 italic">Tu Pedido</h3>
        <button 
          onClick={vaciarCarrito}
          className="text-red-500 text-xs font-bold hover:bg-red-50 px-2 py-1 rounded transition-colors"
        >
          VACIAR CARRITO
        </button>
      </div>

      {/* LISTA DE PRODUCTOS CON SCROLL */}
      <div className="max-h-[450px] overflow-y-auto">
        {carrito.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-50 flex items-center gap-4 hover:bg-blue-50/50 transition-colors">
            {/* Miniatura del producto */}
            <img 
              src={`https://picsum.photos/seed/${item.id}/150/150`} 
              className="w-14 h-14 rounded-lg object-cover shadow-sm bg-white"
              alt={item.nombre} 
            />
            
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.nombre}</h4>
              <p className="text-blue-600 font-black text-sm">${item.precio.toLocaleString()}</p>
            </div>

            {/* CONTROLES DE CANTIDAD */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
              <button 
                onClick={() => actualizarCantidad(item.id, -1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-gray-500 hover:text-red-500 transition-colors"
              >
                -
              </button>
              <span className="font-bold text-sm w-6 text-center">{item.cantidad || 1}</span>
              <button 
                onClick={() => actualizarCantidad(item.id, 1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-gray-500 hover:text-green-600 transition-colors"
              >
                +
              </button>
            </div>

            {/* BOTÓN ELIMINAR */}
            <button 
              onClick={() => eliminarDelCarrito(item.id)}
              className="p-1 text-gray-300 hover:text-red-500 transition-colors"
              title="Eliminar producto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* PIE DEL CARRITO Y TOTALES */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Estimado</span>
            <span className="text-3xl font-black text-blue-700 leading-none">
              ${obtenerTotal().toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded-full uppercase">
              {carrito.length} Items
            </span>
          </div>
        </div>

        {/* BOTÓN HACIA CHECKOUT */}
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
        >
          <span>IR A PAGAR</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;