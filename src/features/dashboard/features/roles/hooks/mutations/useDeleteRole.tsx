import { useMutation } from "@tanstack/react-query";
import { RolesAPI } from "../../api/roleService";

export function useDeleteRole() {
  return useMutation({
    mutationFn: ({ roleName }: { roleName: string }) =>
      RolesAPI.delete(roleName),
    retry: 0,
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
