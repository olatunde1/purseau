import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

const CreateDeliveryAddress = (data) => {
    return axiosInstance.post(`/user/create/address/book`, data);
};

const useCreateDeliveryAddress = () => {
    return useMutation({
        mutationFn: (data) => CreateDeliveryAddress(data),
    });
};

export default useCreateDeliveryAddress;
