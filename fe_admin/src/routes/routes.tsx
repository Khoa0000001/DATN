import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import ResultPage from "@/page/result/ResultPage";
import LoginPage from "@/page/auth/LoginPage";
import RegisterPage from "@/page/auth/RegisterPage";
import Dashboard from "@/page/dashboard/Dashboard";

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
            <ProtectedRoute requiredRoles={["user"]}>
              <Dashboard />
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
