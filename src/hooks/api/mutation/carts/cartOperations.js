import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

// Add to cart mutation
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItem) => {
      return axiosInstance.post("/user/cart/add", cartItem);
    },
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
export const useLikeAProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => {
      return axiosInstance.patch(`/user/like/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
export const useUnLikeAProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => {
      return axiosInstance.patch(`/user/unlike/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Remove from cart mutation
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => {
      return axiosInstance.delete(`/user/cart/remove/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Increment cart item mutation
export const useIncrementCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => {
      return axiosInstance.put(`/user/cart/increment/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Decrement cart item mutation
export const useDecrementCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => {
      return axiosInstance.put(`user/cart/decrement/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Clear cart mutation
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axiosInstance.delete("user/cart/clear");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Fetch cart items query hook
export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => axiosInstance.get("/user/cart"),
  });
};
