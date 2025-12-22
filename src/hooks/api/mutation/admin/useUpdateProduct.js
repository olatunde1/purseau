import { useMutation } from "@tanstack/react-query";
import adminAxiosInstace from "@/hooks/adminAxiosInstace";

// Update a product by ID. Expects FormData as payload.
const updateProduct = ({ id, data }) =>
  adminAxiosInstace.put(`/product/edit/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationFn: ({ id, data }) => updateProduct({ id, data }),
  });
