import { useMutation } from "@tanstack/react-query";
import type { regionFormValues } from "../../types/regionType";
import { RegionAPI } from "../../api/regionService";

export function useAddRegion() {
  return useMutation({
    mutationFn: (data: regionFormValues) => RegionAPI.create(data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
