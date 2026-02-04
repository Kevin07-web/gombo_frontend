import { api } from "@/shared/api/api";
import type { Category, CtgFormValues } from "../types/CategoryTypes";

export const CategoryAPI = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get("/categories");
    return res.data;
  },
  getOne: async (ctgId: string): Promise<Category> => {
    const res = await api.get(`/categories/${ctgId}`);
    return res.data;
  },
  create: async (data: CtgFormValues): Promise<Category> => {
    const res = await api.post("/categories", data);
    return res.data;
  },
  update: (ctgId: string, data: Category) =>
    api.put(`/categories/${ctgId}`, data),
  delete: (ctgId: string) => api.delete(`/categories/${ctgId}`),
};
