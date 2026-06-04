import { apiService } from "./api";

export const authService = {
  login: async (credentials) => {
    const response = await apiService.post("/api/login", credentials);
    console.log("REACT_APP_API_BASE_URL", process.env.REACT_APP_API_BASE_URL);

    return response.data;
  },

  logout: async () => {
    await apiService.post("/api/logout");
    // No need to remove token from localStorage since we're using cookies
  },

  // Add a method to check if user is authenticated
  isAuthenticated: async () => {
    try {
      const response = await apiService.get("/api/validate", {
        withCredentials: true,
      });
      //console.log("isAuthenticated response:", response);

      return response.status === 200 ? true : false;
    } catch (error) {
      return false;
    }
  },
};
