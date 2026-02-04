import { useMutation } from "@tanstack/react-query";
import type { Region } from "../../types/regionType";
import { RegionAPI } from "../../api/regionService";

export function useEditRegion() {
  return useMutation({
    mutationFn: ({ regionId, data }: { regionId: string; data: Region }) =>
      RegionAPI.update(regionId, data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
