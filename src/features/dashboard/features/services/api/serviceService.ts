import { api } from "@/shared/api/api";
import type { Service, ServiceFormValues } from "../types/serviceType";

export const ServiceAPI = {
  getAll: async (): Promise<Service[]> => {
    const res = await api.get("/services");
    return res.data;
  },
  getOne: async (serviceId: string): Promise<Service> => {
    const res = await api.get(`/services/${serviceId}`);
    return res.data;
  },
  create: async (data: ServiceFormValues): Promise<Service> => {
    const res = await api.post("/services", data);
    return res.data;
  },
  update: (serviceId: string, data: Service) =>
    api.put(`/services/${serviceId}`, data),
  delete: (serviceId: string) => api.delete(`/services/${serviceId}`),
};
