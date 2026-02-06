import { useQuery } from "@tanstack/react-query";
import type { Province } from "../../types/ProvinceType";
import { ProvinceAPI } from "../../api/ProvinceService";

export function useRegion({
  provinceId,
  enabled,
}: {
  provinceId: string;
  enabled: boolean;
}) {
  return useQuery<Province>({
    queryKey: ["province", provinceId],
    queryFn: () => ProvinceAPI.getOne(provinceId),
    enabled: !!provinceId && enabled,
    gcTime: 0,
  });
}
