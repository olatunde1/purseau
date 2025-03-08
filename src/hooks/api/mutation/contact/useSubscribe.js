import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/hooks/axiosInstace";

const subscribe = (data) => {
  return axiosInstance.post(`/subscribe`, data);
};

const useSubscribe = () => {
  return useMutation({
    mutationFn: (data) => subscribe(data),
  });
};

export default useSubscribe;
