import { useQuery } from "@tanstack/react-query";
import type { Province } from "../../types/ProvinceType";
import { ProvinceAPI } from "../../api/ProvinceService";

export function useProvinces() {
  return useQuery<Province[]>({
    queryKey: ["provinces"],
    queryFn: ProvinceAPI.getAll,
  });
}
