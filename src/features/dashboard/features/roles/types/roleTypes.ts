import { z } from "zod";
import type { roleSchemas } from "../schemas/roleSchemas";

export type RoleFormValues = z.infer<typeof roleSchemas>;
export type Role = {
  id: string;
  name: string;
  description: string | null;
};
