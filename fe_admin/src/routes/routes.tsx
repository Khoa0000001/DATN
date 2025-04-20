import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import ResultPage from "@/page/result/ResultPage";
import LoginPage from "@/page/auth/LoginPage";
import RegisterPage from "@/page/auth/RegisterPage";
import Dashboard from "@/page/dashboard/Dashboard";
import Setting from "@/page/setting/Setting";
import Role from "@/page/grantPermission/role/RolePage";
import Pormission from "@/page/grantPermission/permission/PermissionPage";
import User from "@/page/grantPermission/user/UserPage";

const AppRoutes = () =>
  useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute requiredRoles={["admin"]}>
              <Setting />
            </ProtectedRoute>
          ),
        },
        {
          path: "roles",
          element: (
            <ProtectedRoute>
              <Role />
            </ProtectedRoute>
          ),
        },
        {
          path: "roles/permission",
          element: (
            <ProtectedRoute>
              <Pormission />
            </ProtectedRoute>
          ),
        },
        {
          path: "roles/user",
          element: (
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <ResultPage
          result={{
            status: "404",
            title: "404",
            subTitle: "Xin lỗi , chúng tôi không tìm thấy trang này !!",
          }}
        />
      ),
    },
  ]);

export default AppRoutes;
