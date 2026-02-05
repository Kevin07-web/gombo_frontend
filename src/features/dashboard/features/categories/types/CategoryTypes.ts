import { z } from "zod";
import type { CtgSchemas } from "../schemas/CategorySchemas";

export type CtgFormValues = z.infer<typeof CtgSchemas>;
export type Category = {
  id: string;
  libelle: string;
  description: string | null;
  statut: "ACTIF" | "INACTIF";
  createdAt: string;
  updateAt: string;
  createdById: string;
  updateById: string;
  currentUserfullName: string;
  currentUserEmail: string;
};
