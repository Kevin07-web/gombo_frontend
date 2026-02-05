import { useQuery } from "@tanstack/react-query";
import type { Quartier } from "../../types/quartierType";
import { QuartierAPI } from "../../api/quartierService";

export function useQuartiers() {
  return useQuery<Quartier[]>({
    queryKey: ["quartiers"],
    queryFn: QuartierAPI.getAll,
  });
}
