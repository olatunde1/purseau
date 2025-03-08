import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_ALLPRODUCTS = "getALLProducts";

const getProducts = async (params = {}) => {
  const response = await axiosInstance.get(`/user/all/products`, {
    params,
  });

  return response.data;
};

const useGetProducts = (params) => {
  return useQuery({
    queryKey: [QUERY_KEY_ALLPRODUCTS, params],
    queryFn: () => getProducts(params),
    staleTime: 10,
  });
};

export default useGetProducts;
