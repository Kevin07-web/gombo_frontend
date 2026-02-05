import { useQuery } from "@tanstack/react-query";
import type { Region } from "../../types/regionType";
import { RegionAPI } from "../../api/regionService";

export function useRegion({
  regionId,
  enabled,
}: {
  regionId: string;
  enabled: boolean;
}) {
  return useQuery<Region>({
    queryKey: ["region", regionId],
    queryFn: () => RegionAPI.getOne(regionId),
    enabled: !!regionId && enabled,
    gcTime: 0,
  });
}
