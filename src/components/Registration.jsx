 
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetRegistrationState,
  selectRegisterLoading,
  selectRegisterError,
  selectRegisterSuccess
} from "../features/register/RegisterSlice"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectRegisterLoading);
  const error = useSelector(selectRegisterError);
  const success = useSelector(selectRegisterSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data; // Exclude confirmPassword
    dispatch(registerUser(userData)); // Dispatch the registerUser thunk
  };

  useEffect(() => {
    if (success) {
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        dispatch(resetRegistrationState()); // Reset the registration state
        navigate("/login"); // Redirect to login page
      }, 3000);
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate]);

  return (
    <div className="registration-container">
      <ToastContainer />
      <div className="registration-card">
        <h2 className="registration-title">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`form-input ${errors.name ? "input-error" : ""}`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`form-input ${errors.password ? "input-error" : ""}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="registration-button"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
