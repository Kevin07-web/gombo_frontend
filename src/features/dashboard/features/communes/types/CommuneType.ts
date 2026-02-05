import { z } from "zod";
import type { communeSchemas } from "../schemas/CommuneSchemas";

export type CommuneFormValues = z.infer<typeof communeSchemas>;

export type Commune = {
  id: string;
  createdAt: Date;
  updateAt: Date;
  createdById: string;
  updateById: string;
  currentUserfullName: string;
  currentUserEmail: string;
  libelle: string;
  longitude: string;
  latitude: string;
  provinceId: string;
  provinceLibelle: string;
};
