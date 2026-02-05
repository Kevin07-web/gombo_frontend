import { useMutation } from "@tanstack/react-query";
import type { Commune } from "../../types/CommuneType";
import { CommuneAPI } from "../../api/communeService";

export function useEditCommune() {
  return useMutation({
    mutationFn: ({ communeId, data }: { communeId: string; data: Commune }) =>
      CommuneAPI.update(communeId, data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
