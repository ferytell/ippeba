import { apiService } from "./api";

export const authService = {
  login: async (credentials) => {
    const response = await apiService.post("/api/login", credentials);
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

// export const authService = {
//   login: async (credentials) => {
//     const response = await apiService.post("/api/login", credentials);
//     console.log("Login response:", response);
//     return response.data;
//   },

//   signup: async (userData) => {
//     const response = await apiService.post("/api/signup", userData);
//     console.log("Signup response:", response);
//     return response.data;
//   },

//   validate: async () => {
//     const response = await apiService.get("/api/validate");
//     return response.data;
//   },

//   logout: async () => {
//     const response = await apiService.post("/api/logout");
//     return response.data;
//   },

//   // Store token in localStorage
//   setToken: (token) => {
//     localStorage.setItem("authToken", token);
//   },

//   // Get token from localStorage
//   getToken: () => {
//     return localStorage.getItem("authToken");
//   },

//   // Remove token (logout)
//   removeToken: () => {
//     localStorage.removeItem("authToken");
//   },

//   // Check if user is authenticated
//   isAuthenticated: () => {
//     return !!localStorage.getItem("authToken");
//   },
// };
