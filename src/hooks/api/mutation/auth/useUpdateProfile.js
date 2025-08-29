import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

const updateProfile = (data) => {
    return axiosInstance.patch(`/user/profile`, data);
};
const updatePassword = (data) => {
    return axiosInstance.patch(`/user/update/password`, data);
};


const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (data) => updateProfile(data),
    });
};

const useUpdatePassword = () => {
    return useMutation({
        mutationFn: (data) => updatePassword(data),
    });
};
export {
    useUpdateProfile,useUpdatePassword
};