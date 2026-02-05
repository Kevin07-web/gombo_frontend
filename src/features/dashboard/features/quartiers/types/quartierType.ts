import { z } from "zod";
import type { quartierSchemas } from "../schemas/quartierSchemas";

export type QuartierFormValues = z.infer<typeof quartierSchemas>;

export type Quartier = {
  id: string;
  createdAt: string;
  updateAt: Date;
  createdById: Date;
  updateById: string;
  currentUserfullName: string;
  currentUserEmail: string;
  libelle: string;
  longitude: string;
  latitude: string;
  communeId: string;
  communeLibelle: string;
};
