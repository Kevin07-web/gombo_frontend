import { useMutation } from "@tanstack/react-query";
import type { Quartier } from "../../types/quartierType";
import { QuartierAPI } from "../../api/quartierService";

export function useEditQuartier() {
  return useMutation({
    mutationFn: ({
      quartierId,
      data,
    }: {
      quartierId: string;
      data: Quartier;
    }) => QuartierAPI.update(quartierId, data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
