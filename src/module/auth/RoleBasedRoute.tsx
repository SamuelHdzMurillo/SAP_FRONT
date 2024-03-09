import { ReactNode, ReactElement } from "react";
import { Navigate } from "react-router-dom";

type RoleBasedRouteProps = {
  children: ReactElement;
  allowedUserTypes: string[];
  to: string;
};

const RoleBasedRoute = ({
  children,
  allowedUserTypes,
  to
}: RoleBasedRouteProps): ReactNode => {
  const userType = localStorage.getItem("user_type");

  if (allowedUserTypes.includes(userType)) {
    return children;
  }

  return <Navigate to={to} replace />; // Redirige a la página 'No autorizado' si el usuario no tiene permisos
};

export default RoleBasedRoute;
