// cartStore.js
import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  cartCount: 0,

  setCartItems: (cartData) => {
    // If cartData is undefined or doesn't have items property
    if (!cartData || !cartData.items) {
      set({ cartItems: [], cartCount: 0 });
      return;
    }

    set(() => ({
      cartItems: cartData.items,
      cartCount: cartData.items.length,
    }));
  },

  resetCart: () => {
    set(() => ({ cartItems: [], cartCount: 0 }));
  },
}));

export default useCartStore;
