import { useQuery } from "@tanstack/react-query";
import { RolesAPI } from "../../api/roleService";
import type { Role } from "../../types/roleTypes";

export function useRoles() {
  return useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: RolesAPI.getAll,
  });
}
