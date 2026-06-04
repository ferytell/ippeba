import { apiService } from "./api";

export const infaqService = {
  // Summary
  getSummary: (year) => apiService.get(`/api/infaq/summary?year=${year}`),

  // By RT
  getByRT: (rt, year) => apiService.get(`/api/infaq/rt/${rt}?year=${year}`),

  // Create infaq record
  createInfaq: (data) => apiService.post("/api/infaq", data),
  updateInfaq: (id, data) => apiService.put(`/api/infaq/${id}`, data),
  deleteInfaq: (id) => apiService.delete(`/api/infaq/${id}`),
};
