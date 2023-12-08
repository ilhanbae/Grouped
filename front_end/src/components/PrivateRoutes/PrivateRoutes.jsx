import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isLoggedIn =
    sessionStorage.getItem("username") &&
    sessionStorage.getItem("email") &&
    sessionStorage.getItem("id") &&
    sessionStorage.getItem("token");
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
