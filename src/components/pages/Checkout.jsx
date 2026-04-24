import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

const Checkout = () => {
  const { carrito, obtenerTotal, vaciarCarrito } = useCartStore();
  const navigate = useNavigate();

  const manejarConfirmacion = () => {
    alert("¡Compra confirmada! Gracias por elegir Web Delivery Fácil.");
    vaciarCarrito();
    navigate('/home'); // Redirigir al catálogo después de comprar
  };

  if (carrito.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">No hay productos para revisar</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 font-bold hover:underline"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 text-center uppercase tracking-tight">
          Revisión de tu Pedido
        </h1>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Datos del Usuario (Simulados para el proyecto) */}
          <div className="p-8 border-b border-gray-100 bg-blue-50">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">Datos de Entrega</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Cliente:</strong> Catalina Ortiz Galvis</p>
              <p><strong>Ciudad:</strong> Medellín, Antioquia</p>
              <p><strong>Método:</strong> Delivery Rápido</p>
              <p><strong>Pago:</strong> Contra Entrega</p>
            </div>
          </div>

          {/* Resumen de Productos */}
          <div className="p-8">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Resumen del Carrito</h2>
            <div className="space-y-4 mb-8">
              {carrito.map((item) => (
                <div key={item.id} className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <div className="flex gap-4 items-center">
                    <span className="bg-gray-100 text-gray-800 font-bold px-2 py-1 rounded-md text-xs">x{item.cantidad}</span>
                    <p className="font-medium text-gray-800">{item.nombre}</p>
                  </div>
                  <p className="font-bold text-gray-900">${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Total Final */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-500 text-sm">Total final a pagar</p>
                <p className="text-4xl font-black text-green-600">${obtenerTotal().toLocaleString()}</p>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/')}
                  className="px-6 py-3 text-gray-500 font-bold hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={manejarConfirmacion}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl shadow-lg transition-all transform active:scale-95"
                >
                  CONFIRMAR COMPRA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;