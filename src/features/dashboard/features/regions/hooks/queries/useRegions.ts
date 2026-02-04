import { useQuery } from "@tanstack/react-query";
import type { Region } from "../../types/regionType";
import { RegionAPI } from "../../api/regionService";

export function useRegions() {
  return useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: RegionAPI.getAll,
  });
}
