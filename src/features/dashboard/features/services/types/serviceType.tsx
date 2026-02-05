import type { BASIC_STATUS } from "@/features/dashboard/types/Dashboard";
import type { serviceSchemas } from "../schemas/servicesSchemas";
import z from "zod";

export type ServiceFormValues = z.infer<typeof serviceSchemas>;
export type Service = {
  id: string;
  libelle: string;
  description: string | null;
  categorieId: string;
  statut: BASIC_STATUS;
  createdAt: string;
  updateAt: string;
  createdById: string;
  updateById: string;
  currentUserfullName: string;
  currentUserEmail: string;
  categorieLibelle: string;
};
