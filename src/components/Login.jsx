import React, { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(credentials);

      console.log("Login response:", response);

      // Check if login was successful
      if (response.message === "succes") {
        // Verify that the user is actually authenticated
        const isAuthenticated = await authService.isAuthenticated();
        console.log("Login isAuthenticated:", isAuthenticated);
        if (isAuthenticated) {
          onLoginSuccess(); // Notify parent component
          navigate("/usaha-ekonomi-mesjid");
          console.log("User is authenticated");
        } else {
          setError("Authentication failed. Please try again.");
        }
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Your Account</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="switch-auth">
          <p>Don't have an account? </p>
          <button
            type="button"
            className="switch-button"
            onClick={onSwitchToSignup}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
