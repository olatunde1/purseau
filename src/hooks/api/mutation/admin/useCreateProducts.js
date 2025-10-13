import { useMutation } from "@tanstack/react-query";

import adminAxiosInstace from "@/hooks/adminAxiosInstace";

const CreateProducts = (data) => {
  return adminAxiosInstace.post(`/product/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useCreateProducts = () => {
  return useMutation({
    mutationFn: (data) => CreateProducts(data),
  });
};

export default useCreateProducts;
