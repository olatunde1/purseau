import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set) => ({
      // Filter states
      category: null,
      brand: null,
      colors: [],
      sizes: [],
      rating: null,
      maxPrice: "",
      searchQuery: "",
      sortBy: "",

      // Actions
      setCategory: (category) =>
        set((state) => ({
          category: state.category === category ? null : category,
        })),

      setBrand: (brand) =>
        set((state) => ({
          brand: state.brand === brand ? null : brand,
        })),

      toggleColor: (color) =>
        set((state) => {
          const colors = [...state.colors];
          if (colors.includes(color)) {
            return { colors: colors.filter((c) => c !== color) };
          } else {
            return { colors: [...colors, color] };
          }
        }),

      toggleSize: (size) =>
        set((state) => {
          const sizes = [...state.sizes];
          if (sizes.includes(size)) {
            return { sizes: sizes.filter((s) => s !== size) };
          } else {
            return { sizes: [...sizes, size] };
          }
        }),

      setRating: (rating) =>
        set((state) => ({
          rating: state.rating === rating ? null : rating,
        })),

      setMaxPrice: (maxPrice) => set({ maxPrice }),

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      setSortBy: (sortBy) => set({ sortBy }),

      resetFilters: () =>
        set({
          category: null,
          brand: null,
          colors: [],
          sizes: [],
          rating: null,
          maxPrice: "",
          searchQuery: "",
          sortBy: "",
        }),
    }),
    {
      name: "product-filters", // storage key
      partialize: (state) => ({
        // only persist these states
        category: state.category,
        brand: state.brand,
        colors: state.colors,
        sizes: state.sizes,
        rating: state.rating,
        maxPrice: state.maxPrice,
        searchQuery: state.searchQuery,
        sortBy: state.sortBy,
      }),
    }
  )
);
