// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/login/AuthSlice";

const ProtectedRoute = ({ children }) => {
  console.log("Protected route");  
  const { token } = useSelector(selectAuth);
  console.log("totken is ",token); 
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
