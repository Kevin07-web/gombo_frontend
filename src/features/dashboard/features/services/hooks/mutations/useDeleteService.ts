import { useMutation } from "@tanstack/react-query";
import { ServiceAPI } from "../../api/serviceService";

export function useDeleteService() {
  return useMutation({
    mutationFn: ({ serviceId }: { serviceId: string }) =>
      ServiceAPI.delete(serviceId),
    retry: 0,

    onError: (error) => {
      console.log(error);
    },
  });
}
