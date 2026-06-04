import { apiService } from "./api";

export const loanService = {
  // Loans (Pinjaman)
  getLoans: () => apiService.get("/api/loans"),
  getLoanById: (id) => apiService.get(`/api/loans/${id}`),
  createLoan: (data) => apiService.post("/api/loans", data),
  updateLoan: (id, data) => apiService.put(`/api/loans/${id}`, data),
  deleteLoan: (id) => apiService.delete(`/api/loans/${id}`),

  // Repayments (Pembayaran)
  getRepayments: (loanId) => apiService.get(`/api/loans/${loanId}/repayments`),
  createRepayment: (loanId, data) =>
    apiService.post(`/api/loans/${loanId}/repayments`, data),
  updateRepayment: (repaymentId, data) =>
    apiService.put(`/api/repayments/${repaymentId}`, data),
  deleteRepayment: (repaymentId) =>
    apiService.delete(`/api/repayments/${repaymentId}`),

  // Summary / Laporan
  getMonthlySummary: (year) =>
    apiService.get(`/api/loans/summary?year=${year}`),
};
