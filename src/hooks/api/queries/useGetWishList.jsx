import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_ALLWISHLIST = "getALLWishlist";

const getWishlist = async (params = {}) => {
    const response = await axiosInstance.get(`/user/liked/products`, {
        params,
    });

    return response.data;
};

const useGetWishlist = (params) => {
    return useQuery({
        queryKey: [QUERY_KEY_ALLWISHLIST, params],
        queryFn: () => getWishlist(params),
        staleTime: 10,
    });
};

export default useGetWishlist;
