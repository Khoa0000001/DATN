import {
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  CrownOutlined,
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
    roles: ["admin"],
  },
  {
    key: "orders",
    label: "Đơn hàng",
    icon: <ShoppingCartOutlined />,
    roles: ["admin"],
    children: [
      {
        key: "order-list",
        label: "Danh sách đơn hàng",
        path: "/orders",
      },
      {
        key: "order-report",
        label: "Báo cáo đơn hàng",
        path: "/orders/report",
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
        label: "Danh sách chức vụ",
        path: "/roles",
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
