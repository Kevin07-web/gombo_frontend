import { useMutation } from "@tanstack/react-query";
import type { ServiceFormValues } from "../../types/serviceType";
import { ServiceAPI } from "../../api/serviceService";

export function useAddService() {
  return useMutation({
    mutationFn: (data: ServiceFormValues) => ServiceAPI.create(data),
    retry: 0,
    onError: (error) => {
      console.log(error);
    },
  });
}
