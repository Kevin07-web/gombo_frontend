import { useMutation } from "@tanstack/react-query";
import type { ProvinceFormValues } from "../../types/ProvinceType";
import { ProvinceAPI } from "../../api/ProvinceService";

export function useAddProvince() {
  return useMutation({
    mutationFn: (data: ProvinceFormValues) => ProvinceAPI.create(data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
