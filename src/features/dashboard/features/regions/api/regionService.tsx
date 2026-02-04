import { api } from "@/shared/api/api";
import type { Region, regionFormValues } from "../types/regionType";

export const RegionAPI = {
  getAll: async (): Promise<Region[]> => {
    const res = await api.get("/regions");
    return res.data;
  },
  getOne: async (regionId: string): Promise<Region> => {
    const res = await api.get(`/regions/${regionId}`);
    return res.data;
  },
  create: async (data: regionFormValues): Promise<Region> => {
    const res = await api.post("/regions", data);
    return res.data;
  },
  update: (regionId: string, data: Region) =>
    api.put(`/regions/${regionId}`, data),
  delete: (regionId: string) => api.delete(`/regions/${regionId}`),
};
