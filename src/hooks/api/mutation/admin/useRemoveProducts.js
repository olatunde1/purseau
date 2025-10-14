import { useMutation } from "@tanstack/react-query";

import adminAxiosInstace from "@/hooks/adminAxiosInstace";

const RemoveProducts = ({ id, ...data }) => {
  return adminAxiosInstace.delete(`/admin/products/${id}`, data);
};

const useRemoveProducts = () => {
  return useMutation({
    mutationFn: (data) => RemoveProducts(data),
  });
};

export default useRemoveProducts;
