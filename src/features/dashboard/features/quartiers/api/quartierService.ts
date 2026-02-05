import { api } from "@/shared/api/api";
import type { Quartier, QuartierFormValues } from "../types/quartierType";

export const QuartierAPI = {
  getAll: async (): Promise<Quartier[]> => {
    const res = await api.get("/quartiers");
    return res.data;
  },
  getOne: async (quartierId: string): Promise<Quartier> => {
    const res = await api.get(`/quartiers/${quartierId}`);
    return res.data;
  },
  create: async (data: QuartierFormValues): Promise<Quartier> => {
    const res = await api.post("/quartiers", data);
    return res.data;
  },
  update: (quartierId: string, data: Quartier) =>
    api.put(`/quartiers/${quartierId}`, data),
  delete: (quartierId: string) => api.delete(`/quartiers/${quartierId}`),
};
