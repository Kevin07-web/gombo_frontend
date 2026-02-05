import { useQuery } from "@tanstack/react-query";
import type { Service } from "../../types/serviceType";
import { ServiceAPI } from "../../api/serviceService";

export function useService({
  serviceId,
  enabled,
}: {
  serviceId: string;
  enabled: boolean;
}) {
  return useQuery<Service>({
    queryKey: ["service", serviceId],
    queryFn: () => ServiceAPI.getOne(serviceId),
    enabled: !!serviceId && enabled,
    gcTime: 0,
  });
}
