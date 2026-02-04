import { useQuery } from "@tanstack/react-query";
import type { Service } from "../../types/serviceType";
import { ServiceAPI } from "../../api/serviceService";

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: ServiceAPI.getAll,
  });
}
