/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import MainC from "../layout/MainC";
import UserHome from "@/module/user/page/UserHome";
import PromotedRegister from "@/module/promoted/page/PromotedRegister";
import PromotedHome from "@/module/promoted/page/PromotedHome";
import PromotorHome from "@/module/promotor/page/PromotorHome";
import ProblemHome from "@/module/problem/page/ProblemHome";
import LoginPage from "@/module/auth/page/LoginPage";
import Dashboard from "@/module/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainC />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/usuarios",
        element: <UserHome />,
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
        path: "/promotores",
        element: <PromotorHome />,
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
