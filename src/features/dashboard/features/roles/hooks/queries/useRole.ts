import { useQuery } from "@tanstack/react-query";
import type { Role } from "../../types/roleTypes";
import { RolesAPI } from "../../api/roleService";
import { AxiosError } from "axios";
import type { ApiError } from "@/shared/type/ApiError";

type UseRoleProps = {
  roleName: string;
  enabled: boolean;
};
export function useRole({ roleName, enabled }: UseRoleProps) {
  return useQuery<Role, AxiosError<ApiError>>({
    queryKey: ["role", roleName],
    queryFn: () => RolesAPI.getOne(roleName),
    enabled: !!roleName && enabled,
    gcTime: 0,
  });
}
