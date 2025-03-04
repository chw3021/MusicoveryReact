// 로그인 여부 검증 컴포넌트

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("MUSICOVERY_ACCESS_TOKEN");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
