import {useMutation} from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

// Call GET /user/track/order/:id
const trackOrderApi = (orderId) => {
    return axiosInstance.get(`/user/track/order/${orderId}`);
};

const useTrackOrder = () => {
    return useMutation({
        mutationFn: trackOrderApi,
    });
};

export {useTrackOrder};
