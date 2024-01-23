/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import MainC from "../layout/MainC";
import UserHome from "@/module/user/page/UserHome";
import PromotedRegister from "@/module/promoted/page/PromotedRegister";
import PromotedHome from "@/module/promoted/page/PromotedHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainC />,
    children: [
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
    ],
  },
]);
