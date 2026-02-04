import { useMutation } from "@tanstack/react-query";
import { ProvinceAPI } from "../../api/ProvinceService";
import type { Province } from "../../types/ProvinceType";

export function useEditProvince() {
  return useMutation({
    mutationFn: ({
      provinceId,
      data,
    }: {
      provinceId: string;
      data: Province;
    }) => ProvinceAPI.update(provinceId, data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
