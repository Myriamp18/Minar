import { Navigate, Outlet } from "react-router-dom";

export const RutasPrivadas = ({ nombreusuario, contra, redirectionTo="/" }) => {
  if (!nombreusuario || !contra) {
    return <Navigate to={redirectionTo} />;
  }
  return <Outlet />;
};
