
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

export const QUERY_KEY_ADDRESSABLE = "getADDRESSABLE";

const GetAddressBook = async (params = {}) => {
    const response = await axiosInstance.get(`/user/address/books
`, {
        params,
    });

    return response.data;
};

const useGetAddressBook = (params) => {
    return useQuery({
        queryKey: [QUERY_KEY_ADDRESSABLE, params],
        queryFn: () => GetAddressBook(params),
        staleTime: 10,
    });
};

export default useGetAddressBook;
