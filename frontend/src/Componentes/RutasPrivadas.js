import { children } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RutasPrivadas = ({ nombreusuario, contra, children, redirectionTo="/" }) => {
  if (!onLogin) {
    return <Navigate to={redirectionTo} />;
  }
  return children ? children: <Outlet />;
};
