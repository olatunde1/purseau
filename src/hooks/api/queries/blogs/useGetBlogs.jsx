import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_getAllBLOGS = "getALLBlogs";

const getBlogs  = async (params = {}) => {
    const response = await axiosInstance.get(`/user/blogs/all`, {
        params,
    });

    return response.data;
};


const useGetBlogs = (params) => {
    return useQuery({
        queryKey: [QUERY_KEY_getAllBLOGS, params],
        queryFn: () => getBlogs (params),
        staleTime: 10,
    });
};

export default useGetBlogs;
