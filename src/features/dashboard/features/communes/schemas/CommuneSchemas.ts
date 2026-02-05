import { z } from "zod";

export const communeSchemas = z.object({
  libelle: z.string().toLowerCase(),
  provinceId: z.string(),
  longitude: z.string(),
  latitude: z.string(),
});
