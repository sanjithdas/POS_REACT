import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../features/login/AuthSlice";
import { useNavigate, Link  } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (result.type === "auth/login/fulfilled") {
      toast.success("Login Successful");
      navigate("/"); // Redirect to dashboard
    } else {
      toast.error(error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="login-links">
          <p>
            Forgot your password?{" "}
            <Link to="/reset-password" className="link">
              Reset Password
            </Link>
          </p>
          <p>
            New user?{" "}
            <Link to="/register" className="link">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
