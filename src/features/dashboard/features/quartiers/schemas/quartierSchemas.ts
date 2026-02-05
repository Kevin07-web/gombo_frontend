import { z } from "zod";

export const quartierSchemas = z.object({
  libelle: z.string().toLowerCase(),
  communeId: z.string(),
  longitude: z.string(),
  latitude: z.string(),
});
