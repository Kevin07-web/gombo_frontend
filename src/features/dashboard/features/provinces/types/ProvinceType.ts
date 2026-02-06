import z from "zod";
import type { provinceSchemas } from "../schemas/ProvinceSchemas";

export type ProvinceFormValues = z.infer<typeof provinceSchemas>;
export type Province = {
  id: string;
  libelle: string;
  statut: string | null;
  createdAt: string;
  updateAt: string;
  createdById: string;
  updateById: string;
  currentUserfullName: string;
  currentUserEmail: string;
  regionLibelle: string;
  longitude: string;
  latitude: string;
  regionId: string;
};
