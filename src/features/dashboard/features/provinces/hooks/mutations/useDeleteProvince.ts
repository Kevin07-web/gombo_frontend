import { useMutation } from "@tanstack/react-query";
import { ProvinceAPI } from "../../api/ProvinceService";

export function useDeleteProvince() {
  return useMutation({
    mutationFn: ({ provinceId }: { provinceId: string }) =>
      ProvinceAPI.delete(provinceId),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
