import { z } from "zod";

export const CtgSchemas = z.object({
  libelle: z.string().min(2, "Le libellé est requis").toLowerCase(),
  description: z.string(),
  statut: z.enum(["ACTIF", "INACTIF"]),
});
