import { useMutation } from "@tanstack/react-query";
import { RolesAPI } from "../../api/roleService";
import type { EditRoleFormValues } from "../../types/roleTypes";

export function useEditRole() {
  return useMutation({
    mutationFn: (data: EditRoleFormValues) => RolesAPI.update(data),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
