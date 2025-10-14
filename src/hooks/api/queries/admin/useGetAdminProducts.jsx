import { useQuery } from "@tanstack/react-query";
import adminAxiosInstace from "@/hooks/adminAxiosInstace";

export const QUERY_KEY_AdminProducts = "GetProducts";

const GetAdminProducts = async (params = {}) => {
  const response = await adminAxiosInstace.get(`/admin/products/all`, {
    params,
  });

  return response.data;
};

const useGetAdminProducts = (params) => {
  return useQuery({
    queryKey: [QUERY_KEY_AdminProducts, params],
    queryFn: () => GetAdminProducts(params),
    staleTime: 10,
  });
};

export default useGetAdminProducts;
