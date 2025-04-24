import React from "react";
import { Breadcrumb, Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import { sidebarItems } from "./components/constants/sidebarItems";
import { findBreadcrumb } from "./utils/getBreadcrumb";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const breadcrumbItems = findBreadcrumb(sidebarItems, location.pathname);
  return (
    <Layout className="h-screen">
      <Header />
      <Layout className="flex">
        <Sidebar />
        <Layout
          className="flex-1 p-6"
          style={{
            minHeight: "calc(100vh - 64px)", // Giảm chiều cao của header
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
          <Content className="p-6 bg-white rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
