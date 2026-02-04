import { z } from "zod";

export const regionSchemas = z.object({
  libelle: z.string(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
});
