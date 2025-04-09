import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_RECENTLYVIEWEDPRODUCTS = "getALLRecentlyViewedProducts";

const getRecentlyViewedProducts = async (params = {}) => {
  const response = await axiosInstance.get(`/user/recently/viewed`, {
    params,
  });

  return response.data;
};

const useGetRecentlyViewedProduct = (params) => {
  return useQuery({
    queryKey: [QUERY_KEY_RECENTLYVIEWEDPRODUCTS, params],
    queryFn: () => getRecentlyViewedProducts(params),
    staleTime: 10,
  });
};

export default useGetRecentlyViewedProduct;
