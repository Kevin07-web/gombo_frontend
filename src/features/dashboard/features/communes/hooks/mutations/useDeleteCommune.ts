import { useMutation } from "@tanstack/react-query";
import { CommuneAPI } from "../../api/communeService";

export function useDeleteCommune() {
  return useMutation({
    mutationFn: ({ communeId }: { communeId: string }) =>
      CommuneAPI.delete(communeId),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
