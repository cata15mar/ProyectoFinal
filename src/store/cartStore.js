import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      carrito: [],

      agregarAlCarrito: (producto) => set((state) => {
        const itemExiste = state.carrito.find((item) => item.id === producto.id);
        
        if (itemExiste) {
          return {
            carrito: state.carrito.map((item) =>
              item.id === producto.id 
                ? { ...item, cantidad: (item.cantidad || 1) + 1 } 
                : item
            ),
          };
        }
        return { carrito: [...state.carrito, { ...producto, cantidad: 1 }] };
      }),

      eliminarDelCarrito: (id) => set((state) => ({
        carrito: state.carrito.filter((item) => item.id !== id),
      })),

      actualizarCantidad: (id, delta) => set((state) => ({
        carrito: state.carrito.map((item) => {
          if (item.id === id) {
            const nuevaCantidad = (item.cantidad || 1) + delta;
            return { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
          }
          return item;
        }),
      })),

      vaciarCarrito: () => set({ carrito: [] }),

      obtenerTotal: () => {
        return get().carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
      },
    }),
    { name: 'carrito-storage' }
  )
);