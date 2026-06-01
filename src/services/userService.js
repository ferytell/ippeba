import { apiService } from "./api";

export const userService = {
  // Get all users
  getUsers: () => apiService.get("/users"),

  // Get user by ID
  getUser: (id) => apiService.get(`/users/${id}`),

  // Create new user
  createUser: (userData) => apiService.post("/users", userData),

  // Update user
  updateUser: (id, userData) => apiService.put(`/users/${id}`, userData),

  // Delete user
  deleteUser: (id) => apiService.delete(`/users/${id}`),

  // Login
  login: (credentials) => apiService.post("/api/login", credentials),

  // Register
  register: (userData) => apiService.post("/api/signup", userData),
};
