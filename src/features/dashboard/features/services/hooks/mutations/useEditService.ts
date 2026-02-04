import { useMutation } from "@tanstack/react-query";
import type { Service } from "../../types/serviceType";
import { ServiceAPI } from "../../api/serviceService";

export function useEditService() {
  return useMutation({
    mutationFn: ({ serviceId, data }: { serviceId: string; data: Service }) =>
      ServiceAPI.update(serviceId, data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
