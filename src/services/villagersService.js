import { apiService } from "./api";

export const villagersService = {
  getVillagers: async () => {
    const response = await apiService.get("/api/villagers");
    return response;
  },

  getVillagerById: async (id) => {
    const response = await apiService.get(`/api/villagers/${id}`);
    return response;
  },

  createVillager: async (data) => {
    const response = await apiService.post("/api/villagers", data);
    return response;
  },

  updateVillager: async (id, data) => {
    const response = await apiService.put(`/api/villagers/${id}`, data);
    return response;
  },

  deleteVillager: async (id) => {
    const response = await apiService.delete(`/api/villagers/${id}`);
    return response;
  },
};
