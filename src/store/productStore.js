import { create } from 'zustand';
import { productos as dataInicial } from '../data/productos';

export const useProductStore = create((set, get) => ({
  products: dataInicial,
  filteredProducts: dataInicial,
  searchQuery: '',
  // --- ESTADO DE PAGINACIÓN ---
  currentPage: 1,
  itemsPerPage: 8,

  setSearchQuery: (query) => set((state) => {
    const filtered = state.products.filter(p => 
      p.nombre.toLowerCase().includes(query.toLowerCase()) || 
      p.categoria.toLowerCase().includes(query.toLowerCase())
    );
    return { searchQuery: query, filteredProducts: filtered, currentPage: 1 }; // Reset a página 1 al buscar
  }),

  setCurrentPage: (page) => set({ currentPage: page }),

  // Función para obtener solo los productos de la página actual
  getPaginatedProducts: () => {
    const { filteredProducts, currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const { filteredProducts, itemsPerPage } = get();
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }
}));