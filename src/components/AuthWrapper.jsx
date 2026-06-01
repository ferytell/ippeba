import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthWrapper = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToSignup = () => setIsLogin(false);
  const handleSwitchToLogin = () => setIsLogin(true);

  return (
    <>
      {isLogin ? (
        <Login
          onLoginSuccess={onAuthSuccess}
          onSwitchToSignup={handleSwitchToSignup}
        />
      ) : (
        <Signup
          onSignupSuccess={onAuthSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </>
  );
};

export default AuthWrapper;
