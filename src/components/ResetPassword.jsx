// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your backend API to send a password reset email
    //  await axios.post("/reset-password", { email });
      toast.success("Password reset link sent to your email.");
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send password reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <ToastContainer />
      <div className="reset-password-card">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-reset-password">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
