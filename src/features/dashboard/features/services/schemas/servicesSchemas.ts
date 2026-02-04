import { z } from "zod";

export const serviceSchemas = z.object({
  libelle: z.string().toLowerCase(),
  description: z.string(),
  statut: z.string().nullable(),
  categorieId: z.string(),
});
