import { z } from "zod";

export const roleSchemas = z.object({
  name: z.string().min(2, "Le nom du rôle est requis").toLowerCase().trim(),
  description: z.string(),
});
