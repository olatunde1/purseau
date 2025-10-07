import { useQuery } from "@tanstack/react-query";
import adminAxiosInstace from "@/hooks/adminAxiosInstace";

export const QUERY_KEY_AdminOrders = "getAdminOrders";

const getAdminOrders = async (params = {}) => {
  const response = await adminAxiosInstace.get(`/admin/orders/all`, {
    params,
  });

  return response.data;
};

const useGetAdminOrders = (params) => {
  return useQuery({
    queryKey: [QUERY_KEY_AdminOrders, params],
    queryFn: () => getAdminOrders(params),
    staleTime: 10,
  });
};

export default useGetAdminOrders;
