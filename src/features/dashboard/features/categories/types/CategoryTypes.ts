import { z } from "zod";
import type { CtgSchemas } from "../schemas/CategorySchemas";
import type { BASIC_STATUS } from "@/features/dashboard/types/Dashboard";

export type CtgFormValues = z.infer<typeof CtgSchemas>;
export type Category = {
  id: string;
  libelle: string;
  description: string | null;
  statut: BASIC_STATUS;
  createdAt: string;
  updateAt: string;
  createdById: string;
  updateById: string;
  currentUserfullName: string;
  currentUserEmail: string;
};
