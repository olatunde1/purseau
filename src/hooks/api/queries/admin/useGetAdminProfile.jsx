import { useQuery } from "@tanstack/react-query";
import adminAxiosInstace from "@/hooks/adminAxiosInstace";

export const QUERY_KEY_AdminProfile = "getAdminProfile";

const getAdminProfile = async (params = {}) => {
  const response = await adminAxiosInstace.get(`/admin/profile`, {
    params,
  });

  return response.data;
};

const useGetAdminProfile = (params) => {
  return useQuery({
    queryKey: [QUERY_KEY_AdminProfile, params],
    queryFn: () => getAdminProfile(params),
    staleTime: 10,
  });
};

export default useGetAdminProfile;
