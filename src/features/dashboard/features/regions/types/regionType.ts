import z from "zod";
import type { regionSchemas } from "../schemas/regionSchemas";

export type regionFormValues = z.infer<typeof regionSchemas>;
export type Region = {
  id: string;
  libelle: string;
  categorieId: string;
  statut: string | null;
  createdAt: string;
  updateAt: string;
  createdById: string;
  updateById: string;
  currentUserfullName: string;
  currentUserEmail: string;
  categorieLibelle: string;
  longitude: string;
  latitude: string;
};
