import { useAuthStore } from "@/module/auth/auth";
import { Route, RouteProps, useNavigate } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  role,
  ...rest
}) => {
  const auth = useAuthStore((state) => state.user);
  const userType = useAuthStore((state) => state.user_type);
  const navigate = useNavigate();

  if (auth === null) {
    navigate("/login");
    return;
  }

  if (userType !== role) {
    navigate("/login");
    return;
  }

  return <Component />;
};

export default PrivateRoute;
