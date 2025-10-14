import { useMutation } from "@tanstack/react-query";

import adminAxiosInstace from "@/hooks/adminAxiosInstace";

const PublishProduct = ({ id, ...data }) => {
  return adminAxiosInstace.patch(`/admin/publish/${id}`, data);
};

const usePublishProduct = () => {
  return useMutation({
    mutationFn: (data) => PublishProduct(data),
  });
};

export default usePublishProduct;
