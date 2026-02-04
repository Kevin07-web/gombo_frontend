import { z } from "zod";

export const provinceSchemas = z.object({
  libelle: z.string().toLowerCase(),
  regionId: z.string(),
  longitude: z.string(),
  latitude: z.string(),
});
