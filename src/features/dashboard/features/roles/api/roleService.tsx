import { api } from "@/shared/api/api";
import type {
  EditRoleFormValues,
  Role,
  RoleFormValues,
} from "../types/roleTypes";

export const RolesAPI = {
  getAll: async (): Promise<Role[]> => {
    const res = await api.get("/roles");
    return res.data;
  },
  getOne: async (roleName: string): Promise<Role> => {
    const res = await api.get(`/roles/${roleName}`);
    return res.data;
  },
  create: async (data: RoleFormValues): Promise<Role> => {
    const res = await api.post("/roles", data);
    return res.data;
  },
  update: (data: EditRoleFormValues) => api.put("/roles/update", data),
  delete: (roleName: string) => api.delete(`/roles/${roleName}`),
};
