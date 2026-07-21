import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );

  return userInfo?.token
    ? <>{children}</>
    : <Navigate to="/login" />;
};

export default ProtectedRoute;