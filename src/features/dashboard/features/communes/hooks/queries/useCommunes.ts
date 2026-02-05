import { useQuery } from "@tanstack/react-query";
import type { Commune } from "../../types/CommuneType";
import { CommuneAPI } from "../../api/communeService";

export function useCommunes() {
  return useQuery<Commune[]>({
    queryKey: ["communes"],
    queryFn: CommuneAPI.getAll,
  });
}
