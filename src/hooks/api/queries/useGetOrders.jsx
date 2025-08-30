import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_ALLORDERS = "getALLOrders";

const getOrders = async (params = {}) => {
    const response = await axiosInstance.get(`/user/all/orders`, {
        params,
    });

    return response.data;
};

const useGetOrders = (params) => {
    return useQuery({
        queryKey: [QUERY_KEY_ALLORDERS, params],
        queryFn: () => getOrders(params),
        staleTime: 10,
    });
};

export default useGetOrders;
