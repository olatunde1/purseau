import { useQuery } from "@tanstack/react-query";
import adminAxiosInstace from "@/hooks/adminAxiosInstace";

export const QUERY_KEY_getAllSingleUser = "getALLSingleUser";

const getSingleUser  = async (id, params = {}) => {
    const response = await adminAxiosInstace.get(`/admin/user/single/${id}`, {
      params,
    });

    return response.data;
};


const useGetSingleUser = (id, params) => {
    return useQuery({
        queryKey: [QUERY_KEY_getAllSingleUser, id, params],
        queryFn: () => getSingleUser (id, params),
        staleTime: 10,
    });
};

export default useGetSingleUser;
