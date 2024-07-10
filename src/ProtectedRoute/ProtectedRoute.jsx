import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoute;
