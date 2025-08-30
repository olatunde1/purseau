import {useMutation} from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

const checkoutApi = (data) => {
    return axiosInstance.post(`/user/checkout`, data);
};

const useCheckout = () => {
    return useMutation({
        mutationFn: (data) => checkoutApi(data),
    });
};


export {
    useCheckout
};