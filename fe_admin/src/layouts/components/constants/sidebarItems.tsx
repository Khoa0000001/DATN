import {
  UserOutlined,
  SettingOutlined,
  CrownOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export interface SidebarItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  roles?: string[];
  permissions?: string[];
  children?: SidebarItem[]; // 🔁 Cho phép lồng menu con
}

export const sidebarItems: SidebarItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <UserOutlined />,
    path: "/",
    // roles: ["admin"],
  },
  {
    key: "goods",
    label: "Hàng hóa",
    icon: <AppstoreOutlined />,
    roles: ["admin"],
    children: [
      {
        key: "goods-list",
        label: "Danh sách sản phẩm",
        path: "/products",
      },
      {
        key: "goods-history",
        label: "Lịch sử bán",
        path: "/products/history",
      },
      {
        key: "categories",
        label: "Danh sách loại sản phẩm",
        path: "/categories",
      },
    ],
  },
  {
    key: "orders",
    label: "Đơn hàng",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "order",
        label: "Danh sách đơn hàng",
        path: "/orders/order",
      },
    ],
  },
  {
    key: "roles",
    label: "Phân quyền",
    icon: <CrownOutlined />,
    // roles: ["admin"],
    children: [
      {
        key: "role-list",
        label: "Danh sách chức vụ",
        path: "/roles",
      },
      {
        key: "role-permission",
        label: "Danh sách quyền",
        path: "/roles/permission",
      },
      {
        key: "role-user",
        label: "Danh sách người dùng",
        path: "/roles/user",
      },
    ],
  },

  {
    key: "settings",
    label: "Cài đặt",
    icon: <SettingOutlined />,
    path: "/settings",
    roles: ["admin"],
  },
];
