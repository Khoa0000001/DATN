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
    // roles: ["admin", "NVS", "NVNH"],
    children: [
      {
        key: "goods-list",
        label: "Sản phẩm",
        path: "/products",
        roles: ["admin", "NVS", "NVNH"],
      },
      {
        key: "goods-history",
        label: "Lịch sử bán",
        path: "/orders/order",
        roles: ["admin", "NVS"],
      },
      {
        key: "categories",
        label: "Loại sản phẩm",
        path: "/categories",
        roles: ["admin", "NVS", "NVNH"],
      },
    ],
  },
  {
    key: "orders",
    label: "Đơn hàng",
    icon: <AppstoreOutlined />,
    roles: ["admin", "NVNH"],
    children: [
      {
        key: "order",
        label: "Đơn hàng",
        path: "/orders/order",
      },
      {
        key: "supplier",
        label: "Nhà cung cấp",
        path: "/orders/supplier",
      },
      {
        key: "import-invoice",
        label: "Nhập hàng",
        path: "/orders/import-invoice",
      },
    ],
  },
  {
    key: "roles",
    label: "Phân quyền",
    icon: <CrownOutlined />,
    roles: ["admin"],
    children: [
      {
        key: "role-list",
        label: "Chức vụ quyền",
        path: "/roles",
      },
      {
        key: "role-permission",
        label: "Danh sách quyền",
        path: "/roles/permission",
      },
      {
        key: "role-user",
        label: "Người dùng",
        path: "/roles/user",
      },
    ],
  },

  {
    key: "settings",
    label: "Cài đặt",
    icon: <SettingOutlined />,
    path: "/settings",
    // roles: ["admin"],
  },
];
