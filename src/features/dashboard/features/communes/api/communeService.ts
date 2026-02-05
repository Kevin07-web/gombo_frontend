import { api } from "@/shared/api/api";
import type { Commune, CommuneFormValues } from "../types/CommuneType";

export const CommuneAPI = {
  getAll: async (): Promise<Commune[]> => {
    const res = await api.get("/communes");
    return res.data;
  },
  getOne: async (communeId: string): Promise<Commune> => {
    const res = await api.get(`/communes/${communeId}`);
    return res.data;
  },
  create: async (data: CommuneFormValues): Promise<Commune> => {
    const res = await api.post("/communes", data);
    return res.data;
  },
  update: (communeId: string, data: Commune) =>
    api.put(`/communes/${communeId}`, data),
  delete: (communeId: string) => api.delete(`/communes/${communeId}`),
};
