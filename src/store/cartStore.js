import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      carrito: [],
      
      agregarAlCarrito: (producto) => set((state) => ({
        carrito: [...state.carrito, producto]
      })),

      vaciarCarrito: () => set({ carrito: [] }),

      // Calculamos el total sumando los precios del estado actual
      obtenerTotal: () => {
        return get().carrito.reduce((acc, item) => acc + item.precio, 0);
      },
    }),
    {
      name: 'carrito-storage', // Nombre de la llave en localStorage
    }
  )
);