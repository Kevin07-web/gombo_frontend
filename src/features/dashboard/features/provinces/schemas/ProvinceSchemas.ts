import { z } from "zod";

export const provinceSchemas = z.object({
  regionId: z.string().nonempty(),
  libelle: z.string().min(2, "Le libellé est requis").toLowerCase(),
  longitude: z
    .string()
    .min(1)
    .regex(/^[0-9]{1,}$/, "Veuillez saisir un nombre"),
  latitude: z
    .string()
    .min(1)
    .min(1)
    .regex(/^[0-9]{1,}$/, "Veuillez saisir un nombre"),
});
