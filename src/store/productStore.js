import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  searchQuery: '',
  loading: false,
  currentPage: 1,
  itemsPerPage: 8, // Puedes cambiar esto a 10 o 12 si prefieres

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(API_URL);
      
      // --- Lógica para tener MÁS productos ---
      // Duplicamos los datos de la API 3 veces para simular un catálogo de 60 items
      // y les asignamos un ID único nuevo para evitar conflictos en las keys de React.
      const bigData = [
        ...response.data,
        ...response.data.map(p => ({ ...p, id: p.id + 100, title: `${p.title} (Pack A)` })),
        ...response.data.map(p => ({ ...p, id: p.id + 200, title: `${p.title} (Pack B)` }))
      ];

      set({ 
        products: bigData, 
        filteredProducts: bigData, 
        loading: false 
      });
    } catch (error) {
      console.error("Error cargando productos de la API:", error);
      set({ loading: false });
    }
  },

  setSearchQuery: (query) => set((state) => {
    const filtered = state.products.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    // Al buscar, siempre reseteamos a la página 1
    return { searchQuery: query, filteredProducts: filtered, currentPage: 1 };
  }),

  setCurrentPage: (page) => {
    // Validamos que la página no se salga de los límites
    const totalPages = get().getTotalPages();
    if (page >= 1 && page <= totalPages) {
      set({ currentPage: page });
      // Opcional: Hacer scroll automático hacia arriba al cambiar de página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

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