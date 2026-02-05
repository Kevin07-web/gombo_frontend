import { useMutation } from "@tanstack/react-query";
import { QuartierAPI } from "../../api/quartierService";
import type { QuartierFormValues } from "../../types/quartierType";

export function useAddQuartier() {
  return useMutation({
    mutationFn: (data: QuartierFormValues) => QuartierAPI.create(data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
