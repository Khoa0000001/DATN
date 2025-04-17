import React from "react";
import { Layout } from "antd";
const Header: React.FC = () => {
  return (
    <Layout.Header className="flex items-center bg-white px-4 shadow-md">
      <div className="demo-logo" />
    </Layout.Header>
  );
};

export default Header;
