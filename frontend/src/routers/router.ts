// Import Layouts
import UserMainLayout from "../layouts/userLayout/MainLayout";
//Import Pages
import HomeUser from "../pages/userPage/Home";
import HomeAdmin from "../pages/adminPage/Home";
import ProductPage from "../pages/userPage/Product";
import NotFound from "../pages/userPage/NotFound";

const publicRoutes = [
  {
    path: "/",
    component: HomeUser,
    layout: UserMainLayout,
  },
  {
    path: "/products",
    component: ProductPage,
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
