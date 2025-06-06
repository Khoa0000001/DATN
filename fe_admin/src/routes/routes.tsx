import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import ResultPage from "@/page/result/ResultPage";
import LoginPage from "@/page/auth/LoginPage";
import RegisterPage from "@/page/auth/RegisterPage";
import Setting from "@/page/setting/Setting";
import Role from "@/page/grantPermission/role/RolePage";
import Pormission from "@/page/grantPermission/permission/PermissionPage";
import User from "@/page/grantPermission/user/UserPage";
import Category from "@/page/goods/category/CategoryPage";
import Product from "@/page/goods/product/ProductPage";
import OrderPage from "@/page/orders/order/OrderPage";
import SupplierPage from "@/page/orders/supplier/SupplierPage";
import ImportInvoicePage from "@/page/orders/importInvoices/ImportInvoicePage";
import { OverviewAnalyticsView } from "@/page/dashboard/view";

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
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <OverviewAnalyticsView />
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
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: "/orders/order",
          element: (
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/orders/supplier",
          element: (
            <ProtectedRoute>
              <SupplierPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/orders/import-invoice",
          element: (
            <ProtectedRoute>
              <ImportInvoicePage />
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
