import { useMutation } from "@tanstack/react-query";
import { RolesAPI } from "../../api/roleService";
import type { RoleFormValues } from "../../types/roleTypes";

export function useAddRole() {
  return useMutation({
    mutationFn: (data: RoleFormValues) => RolesAPI.create(data),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
