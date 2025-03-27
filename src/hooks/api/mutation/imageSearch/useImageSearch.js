import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstace";

const imageSearch = (data) => {
  return axiosInstance.post(`/product/search-similar`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useImageSearch = () => {
  return useMutation({
    mutationFn: (data) => imageSearch(data),
  });
};

export default useImageSearch;
