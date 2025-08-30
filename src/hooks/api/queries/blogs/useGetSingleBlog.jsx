import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_getAllSingleBLOGS = "getALLSingleBlogs";

const getSingleBlogs  = async (id, params = {}) => {
    const response = await axiosInstance.get(`/user/blog/${id}`, {
        params,
    });

    return response.data;
};


const useGetSingleBlogs = (id, params) => {
    return useQuery({
        queryKey: [QUERY_KEY_getAllSingleBLOGS, id, params],
        queryFn: () => getSingleBlogs (id, params),
        staleTime: 10,
    });
};

export default useGetSingleBlogs;
