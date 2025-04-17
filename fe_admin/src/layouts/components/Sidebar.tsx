import React from "react";
import { Menu, Layout, theme } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { sidebarItems } from "./constants/sidebarItems";
import type { MenuProps } from "antd";
import type { SidebarItem } from "./constants/sidebarItems"; // nếu bạn export interface ra dùng lại

const Sidebar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { roles, permissions } = useSelector((state: RootState) => state.auth);

  // ✅ Hàm kiểm tra quyền truy cập
  const hasAccess = (item: SidebarItem) => {
    const hasRole = item.roles
      ? item.roles.some((r) => roles.includes(r))
      : true; 
    const hasPermission = item.permissions
      ? item.permissions.some((p) => permissions.includes(p))
      : true;
    return hasRole && hasPermission;
  };

  // ✅ Hàm đệ quy để build menu items có thể lồng nhau
  const buildMenuItems = (items: SidebarItem[]): MenuProps["items"] => {
    return items.filter(hasAccess).map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      children: item.children ? buildMenuItems(item.children) : undefined,
      onClick: () => {
        if (item.path) navigate(item.path);
      },
    }));
  };

  const filteredItems = buildMenuItems(sidebarItems);

  return (
    <Layout.Sider width={200} style={{ background: colorBgContainer }}>
      <Menu
        mode="inline"
        defaultOpenKeys={["dashboard"]}
        style={{ height: "100%", borderRight: 0 }}
        items={filteredItems}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
