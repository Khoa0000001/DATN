import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          icon: <SettingOutlined />,
          label: "Cài đặt",
        },
        {
          key: "2",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <Layout.Header className="flex items-center justify-between bg-white px-6 shadow-md h-16">
      {/* Logo và tên hệ thống */}
      <div className="flex items-center space-x-3">
        <img
          src="/logoCPT.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-semibold text-white">
          Hệ thống quản trị
        </span>
      </div>

      {/* Thông tin người dùng */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-white">
          Xin chào, {userInfo?.nameUser || "Người dùng"}
        </span>
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar
            size="large"
            src={userInfo?.profilePicture || undefined}
            icon={!userInfo?.profilePicture && <UserOutlined />}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
