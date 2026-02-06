import { z } from "zod";

export const roleSchemas = z.object({
  name: z.string().min(2, "Le nom du rôle est requis").toLowerCase().trim(),
  description: z.string(),
});

export const editRoleSchemas = z.object({
  oldName: z.string().min(2, "Le nom du rôle est requis").toLowerCase().trim(),
  newName: z.string(),
  description: z.string(),
});
