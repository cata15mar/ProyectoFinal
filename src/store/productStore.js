import { create } from 'zustand';
import { productos as dataInicial } from '../data/productos'; // Importamos tus 100 productos

export const useProductStore = create((set) => ({
  products: dataInicial,
  filteredProducts: dataInicial,
  searchQuery: '',

  setSearchQuery: (query) => set((state) => {
    const filtered = state.products.filter(p => 
      p.nombre.toLowerCase().includes(query.toLowerCase()) || 
      p.categoria.toLowerCase().includes(query.toLowerCase())
    );
    return { searchQuery: query, filteredProducts: filtered };
  }),
}));