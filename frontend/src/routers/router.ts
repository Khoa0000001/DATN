// Import Layouts
import UserMainLayout from "../layouts/userLayout/MainLayout";
//Import Pages
import HomeUser from "../pages/userPage/Home";
import HomeAdmin from "../pages/adminPage/Home";
import ProductPage from "../pages/userPage/Product";
import CartPage from "../pages/userPage/Cart";
import ListProducts from "@/pages/userPage/ListProducts";
import BuildPC from "@/pages/userPage/BuildPC";
import NotFound from "../pages/userPage/NotFound";

const publicRoutes = [
  {
    path: "/",
    component: HomeUser,
    layout: UserMainLayout,
  },
  {
    path: "/product",
    component: ProductPage,
    layout: UserMainLayout,
  },
  {
    path: "/carts",
    component: CartPage,
    layout: UserMainLayout,
  },
  {
    path: "/listproducts",
    component: ListProducts,
    layout: UserMainLayout,
  },
  {
    path: "/buildpc",
    component: BuildPC,
    layout: UserMainLayout,
  },
  {
    path: "/notfound",
    component: NotFound,
    layout: UserMainLayout,
  },
];

const protectedRoutes = [
  {
    path: "/admin",
    component: HomeAdmin,
    layout: UserMainLayout,
    roles: ["admin"],
  },
];

export { publicRoutes, protectedRoutes };
