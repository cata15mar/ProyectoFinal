import React from 'react';
import ProductGallery from '../components/organisms/ProductGallery';
import ShoppingCart from '../components/organisms/ShoppingCart';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

const Home = () => {
  const { setSearchQuery, searchQuery } = useProductStore();
  const { carrito } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-black text-blue-700">Web Delivery Fácil</h1>
          
          <input 
            type="text" 
            placeholder="Busca tecnología..." 
            className="w-full md:w-96 p-2 border border-gray-300 rounded-full px-6 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {carrito.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SECCIÓN DE PRODUCTOS */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-tight">Catálogo de Productos</h2>
            <ProductGallery />
          </div>

          {/* SECCIÓN DEL CARRITO */}
          <div className="lg:w-1/3">
            <div className="sticky top-28">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-tight">Tu Carrito</h2>
              <ShoppingCart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;