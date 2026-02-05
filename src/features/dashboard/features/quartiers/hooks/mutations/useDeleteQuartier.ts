import { useMutation } from "@tanstack/react-query";
import { QuartierAPI } from "../../api/quartierService";

export function useDeleteQuartier() {
  return useMutation({
    mutationFn: ({ quartierId }: { quartierId: string }) =>
      QuartierAPI.delete(quartierId),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
