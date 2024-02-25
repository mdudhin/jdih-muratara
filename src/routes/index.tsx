import DashboardPage from "../pages/admin/dashboard";
import DetailPeraturanPage from "@/pages/admin/peraturan/detail";
import HomePage from "../pages/user/home";
import LayoutAdmin from "../layout/admin";
import LayoutUser from "../layout/user";
import LoginPage from "../pages/auth/login";
import PeraturanPage from "../pages/admin/peraturan";
import ProtectedRoutes from "./protectedRoutes";
import RegisterPage from "../pages/auth/register";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "peraturan",
            element: <PeraturanPage />,
          },
          {
            path: "peraturan/detail/:action",
            element: <DetailPeraturanPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
