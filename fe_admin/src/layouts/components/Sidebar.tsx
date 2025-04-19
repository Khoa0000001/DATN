import React from "react";
import { Menu, Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { sidebarItems } from "./constants/sidebarItems";
import type { MenuProps } from "antd";
import type { SidebarItem } from "./constants/sidebarItems"; // nếu bạn export interface ra dùng lại
import { useHasAccess } from "@/hook/useHasAccess";

const Sidebar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const hasAccess = useHasAccess();

  // ✅ Hàm đệ quy để build menu items có thể lồng nhau
  const buildMenuItems = (items: SidebarItem[]): MenuProps["items"] => {
    return items
      .filter((item) =>
        hasAccess({ roles: item.roles, permissions: item.permissions })
      )
      .map((item) => ({
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
