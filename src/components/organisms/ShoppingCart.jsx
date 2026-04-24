import React from 'react';
import { useCartStore } from '../../store/cartStore';

const ShoppingCart = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, obtenerTotal, vaciarCarrito } = useCartStore();

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
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="text-xl font-black text-gray-800">Resumen de Compra</h3>
        <button 
          onClick={vaciarCarrito}
          className="text-red-500 text-sm font-bold hover:underline"
        >
          Vaciar todo
        </button>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        {carrito.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-50 flex items-center gap-4 hover:bg-blue-50 transition-colors">
            <img 
              src={`https://picsum.photos/seed/${item.id}/100/100`} 
              className="w-16 h-16 rounded-lg object-cover shadow-sm"
              alt={item.nombre} 
            />
            
            <div className="flex-grow">
              <h4 className="font-bold text-gray-800 leading-tight">{item.nombre}</h4>
              <p className="text-blue-600 font-bold text-sm">${item.precio.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
              <button 
                onClick={() => actualizarCantidad(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-blue-600"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{item.cantidad}</span>
              <button 
                onClick={() => actualizarCantidad(item.id, 1)}
                className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-blue-600"
              >
                +
              </button>
            </div>

            <button 
              onClick={() => eliminarDelCarrito(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total a pagar</span>
          <span className="text-3xl font-black text-green-600">${obtenerTotal().toLocaleString()}</span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 text-lg">
          FINALIZAR COMPRA
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;