/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import MainC from "../layout/MainC";
import UserHome from "@/module/user/page/UserHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainC />,
    children: [
      {
        path: "/usuarios",
        element: <UserHome/>,
      },
    ],
  },
]);
