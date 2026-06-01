// components/CookieDebugger.js
import React, { useState, useEffect } from "react";

const CookieDebugger = () => {
  const [cookies, setCookies] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  // Function to display all cookies
  const displayCookies = () => {
    setCookies(document.cookie);
  };

  // Test API call to check if cookies are being sent
  const testApiCall = async () => {
    try {
      const response = await fetch("https://your-api-domain.com/test", {
        credentials: "include", // Important for sending cookies
      });

      const data = await response.json();
      setApiResponse(data);

      // Check response headers for cookies
      console.log("Response headers:");
      response.headers.forEach((value, name) => {
        console.log(`${name}: ${value}`);
      });
    } catch (error) {
      console.error("API test error:", error);
    }
  };

  useEffect(() => {
    displayCookies();
  }, []);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h3>Cookie Debugger</h3>

      <div>
        <h4>Current Cookies:</h4>
        <pre>{cookies || "No cookies found"}</pre>
      </div>

      <button onClick={displayCookies} style={{ marginRight: "10px" }}>
        Refresh Cookies
      </button>

      <button onClick={testApiCall}>Test API Call</button>

      {apiResponse && (
        <div style={{ marginTop: "20px" }}>
          <h4>API Response:</h4>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CookieDebugger;
