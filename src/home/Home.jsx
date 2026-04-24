import React from 'react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

const Home = () => {
  // Traemos lo necesario de los stores
  const { filteredProducts, setSearchQuery, searchQuery } = useProductStore();
  const { carrito, agregarAlCarrito, obtenerTotal } = useCartStore();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1>Web Delivery Fácil</h1>
        
        {/* Buscador sugerido */}
        <input 
          type="text" 
          placeholder="Buscar producto o categoría..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
        />

        <div style={{ textAlign: 'right' }}>
          <h3>🛒 Carrito: {carrito.length} items</h3>
          <p>Total: <strong>${obtenerTotal().toLocaleString()}</strong></p>
        </div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {filteredProducts.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center', background: 'white' }}>
            <h4>{prod.nombre}</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{prod.categoria}</p>
            <p><strong>${prod.precio.toLocaleString()}</strong></p>
            <button 
              onClick={() => agregarAlCarrito(prod)}
              style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Agregar
            </button>
          </div>
        ))}
      </section>

      {carrito.length > 0 && (
        <section style={{ marginTop: '30px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
          <h3>Resumen de Pedido</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '15px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {carrito.map((item, index) => (
                <li key={index} style={{ borderBottom: '1px solid #ddd', padding: '5px 0' }}>
                  {item.nombre} - <strong>${item.precio.toLocaleString()}</strong>
                </li>
              ))}
            </ul>
          </div>
          <button style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Finalizar Compra (${obtenerTotal().toLocaleString()})
          </button>
        </section>
      )}
    </div>
  );
};

export default Home;