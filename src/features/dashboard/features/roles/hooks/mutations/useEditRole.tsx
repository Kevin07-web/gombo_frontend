import { useMutation } from "@tanstack/react-query";
import { RolesAPI } from "../../api/roleService";
import type { Role } from "../../types/roleTypes";

export function useEditRole() {
  return useMutation({
    mutationFn: (data: Role) => RolesAPI.update(data),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
