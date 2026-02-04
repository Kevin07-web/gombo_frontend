import { z } from "zod";

export const CtgSchemas = z.object({
  libelle: z.string().toLowerCase(),
  description: z.string(),
  status: z.string(),
});
