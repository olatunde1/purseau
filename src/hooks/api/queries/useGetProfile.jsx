import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_Profile = "getProfile";

const getProfile = async (params = {}) => {
    const response = await axiosInstance.get(`/user/profile`, {
        params,
    });

    return response.data;
};

const useGetProfile = (params) => {
    return useQuery({
        queryKey: [QUERY_KEY_Profile, params],
        queryFn: () => getProfile(params),
        staleTime: 10,
    });
};

export default useGetProfile;
