import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

const contactUs = (data) => {
  return axiosInstance.post(`/contactus`, data);
};

const useContactUs = () => {
  return useMutation({
    mutationFn: (data) => contactUs(data),
  });
};

export default useContactUs;
