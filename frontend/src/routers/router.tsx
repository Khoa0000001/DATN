import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/userLayout/MainLayout";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Product from "@/pages/Product";
import ListProdeucts from "@/pages/ListProducts";
import BuildPC from "@/pages/BuildPC";
import OrderHistoryPage from "@/pages/OrderHistoryPage";

const AppRoutes = () =>
  useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "products/:id",
          element: <Product />,
        },
        {
          path: "list-products/:id",
          element: <ListProdeucts />,
        },
        {
          path: "build-pc",
          element: <BuildPC />,
        },
        {
          path: "order-history-page",
          element: (
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <div>23</div>,
    },
  ]);

export default AppRoutes;
