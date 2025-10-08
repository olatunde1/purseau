import { useQuery } from "@tanstack/react-query";
import adminAxiosInstace from "@/hooks/adminAxiosInstace";

export const QUERY_KEY_AdminUsers = "getAdminUsers";

const getAdminUsers = async (params = {}) => {
  const response = await adminAxiosInstace.get(`/admin/users/all`, {
    params,
  });

  return response.data;
};

const useGetAdminUsers = (params) => {
  return useQuery({
    queryKey: [QUERY_KEY_AdminUsers, params],
    queryFn: () => getAdminUsers(params),
    staleTime: 10,
  });
};

export default useGetAdminUsers;
