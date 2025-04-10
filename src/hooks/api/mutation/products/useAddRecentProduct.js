import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

const AddRecentProduct = (id) => {
  return axiosInstance.patch(`/user/add/recently/viewed/${id}`);
};

const useAddRecentProduct = (id) => {
  return useMutation({
    mutationFn: () => AddRecentProduct(id),
    enabled: !!id, 
  });
};

export default useAddRecentProduct;
