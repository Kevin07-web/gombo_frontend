import { useMutation } from "@tanstack/react-query";
import { RegionAPI } from "../../api/regionService";

export function useDeleteRegion() {
  return useMutation({
    mutationFn: ({ regionId }: { regionId: string }) =>
      RegionAPI.delete(regionId),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
