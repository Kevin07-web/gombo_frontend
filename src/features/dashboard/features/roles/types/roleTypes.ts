import { z } from "zod";
import type { editRoleSchemas, roleSchemas } from "../schemas/roleSchemas";

export type RoleFormValues = z.infer<typeof roleSchemas>;
export type EditRoleFormValues = z.infer<typeof editRoleSchemas>;
export type Role = {
  id: string;
  name: string;
  description: string | null;
};
