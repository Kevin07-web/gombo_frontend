import { api } from "@/shared/api/api";
import type { Province, ProvinceFormValues } from "../types/ProvinceType";

export const ProvinceAPI = {
  getAll: async (): Promise<Province[]> => {
    const res = await api.get("/provinces");
    return res.data;
  },
  getOne: async (provinceId: string): Promise<Province> => {
    const res = await api.get(`/provinces/${provinceId}`);
    return res.data;
  },
  create: async (data: ProvinceFormValues): Promise<Province> => {
    const res = await api.post("/provinces", data);
    return res.data;
  },
  update: (provinceId: string, data: Province) =>
    api.put(`/provinces/${provinceId}`, data),
  delete: (provinceId: string) => api.delete(`/provinces/${provinceId}`),
};
