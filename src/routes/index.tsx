/* eslint-disable react-refresh/only-export-components */
import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import MainC from "../layout/MainC";
import UserHome from "@/module/user/page/UserHome";
import PromotedRegister from "@/module/promoted/page/PromotedRegister";
import PromotedHome from "@/module/promoted/page/PromotedHome";
import PromotorHome from "@/module/promotor/page/PromotorHome";
import ProblemHome from "@/module/problem/page/ProblemHome";
import LoginPage from "@/module/auth/page/LoginPage";
import Dashboard from "@/module/dashboard/pages/Dashboard";
import DashboardMap from "@/module/dashboard/pages/DashboardMap";
import UserDetail from "@/module/user/page/UserDetail";
import PromotorDetail from "@/module/promotor/page/PromotorDetail";
import PromotedDetail from "@/module/promoted/page/PromotedDetail";
import Municipal from "@/module/charts/pages/Municipals";
import Date from "@/module/charts/pages/Date";
import Count from "@/module/charts/pages/Countchart";
import GoalPage from "@/module/goals/pages/GoalPage";
import GoalDistricts from "@/module/goals/pages/GoalDistrictsPage";
import GoalSectionsPage from "@/module/goals/pages/GoalSectionsPage";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainC />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/metas",
        element: <GoalPage />,
      },
      {
        path: "metas-distrito",
        element: <GoalDistricts />,
      },
      {
        path: "metas-seccion",
        element: <GoalSectionsPage />,
      },
      {
        path: "/graficas-por-fecha",
        element: <Date />,
      },
      {
        path: "/municipals",
        element: <Municipal />,
      },
      {
        path: "/Count",
        element: <Count />,
      },
      {
        path: "/mapa",
        element: <DashboardMap />,
      },
      {
        path: "/usuarios",
        element: <UserHome />,
      },
      {
        path: "/usuarios/:id",
        element: <UserDetail />,
      },
      {
        path: "/promovidos",
        element: <PromotedHome />,
      },
      {
        path: "/promovidos-registrar",
        element: <PromotedRegister />,
      },
      {
        path: "/promovidos-editar/:id",
        element: <PromotedRegister />,
      },
      {
        path: "/promovidos/:id",
        element: <PromotedDetail />,
      },
      {
        path: "/promotores",
        element: <PromotorHome />,
      },
      {
        path: "/promotores/:id",
        element: <PromotorDetail />,
      },
      {
        path: "/Problemas",
        element: <ProblemHome />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
