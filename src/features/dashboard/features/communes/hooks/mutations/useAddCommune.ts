import { useMutation } from "@tanstack/react-query";
import type { CommuneFormValues } from "../../types/CommuneType";
import { CommuneAPI } from "../../api/communeService";

export function useAddCommune() {
  return useMutation({
    mutationFn: (data: CommuneFormValues) => CommuneAPI.create(data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
