

import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

const editDeliveryAddress = ({id, ...data}) => {
    return axiosInstance.patch(`/user/address/update/${id}`, data);
};

const useEditDeliveryAddress = () => {
    return useMutation({
        mutationFn: ( data) => editDeliveryAddress( data),
    });
};

export default useEditDeliveryAddress;
