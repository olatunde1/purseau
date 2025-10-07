import { useQuery } from "@tanstack/react-query";
import adminAxiosInstace from "@/hooks/adminAxiosInstace";

export const QUERY_KEY_AdminOverview = "getAdminOverview";

const getAdminOverview = async (params = {}) => {
  const response = await adminAxiosInstace.get(`/admin/overview`, {
    params,
  });

  return response.data;
};

const useGetAdminOverview = (params) => {
  return useQuery({
    queryKey: [QUERY_KEY_AdminOverview, params],
    queryFn: () => getAdminOverview(params),
    staleTime: 10,
  });
};

export default useGetAdminOverview;
