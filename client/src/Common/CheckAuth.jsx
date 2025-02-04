import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuth, user, children }) => {
  const location = useLocation();
  
  

  if (
    !isAuth &&
    (location?.pathname?.includes("/tutor") ||
      location?.pathname?.includes("/student"))
  ) {
    return <Navigate to={"/"} />;
  }
  if (
    isAuth &&
    (location?.pathname?.includes("/auth") )
  ) {
    if (user?.role === "tutor") {
      return <Navigate to={"/"} />;
    } else {
      return <Navigate to={"/"} />;
    }
  }

  if (
    isAuth &&
    user?.role === "student" &&
    location.pathname?.includes("/tutor")
  ) {
    return <Navigate to={"/"} />;
  }
  if (
    isAuth &&
    user?.role === "tutor" &&
    location.pathname?.includes("/student")
  ) {
    return <Navigate to={"/"} />;
  }
  return <div>{children}</div>;
};

export default CheckAuth;
