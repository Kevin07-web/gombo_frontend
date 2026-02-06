import { useMutation } from "@tanstack/react-query";
import { ProvinceAPI } from "../../api/ProvinceService";
import type { Province } from "../../types/ProvinceType";

export function useEditProvince() {
  return useMutation({
    mutationFn: ({ data }: { provinceId: string; data: Province }) =>
      ProvinceAPI.update(data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
