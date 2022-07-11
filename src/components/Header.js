/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { 
  InsertRowAboveOutlined, 
  LogoutOutlined,
  HomeOutlined
 } from '@ant-design/icons';

const centerStyle = {
  padding: '0 50px',
  marginBottom: 10,
};

const username = localStorage.getItem("username");

const handleLogout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

const Header = () => {
  return (
    <>
        <Menu mode="horizontal" theme='dark' style={centerStyle}>
          <Menu.SubMenu key="SubMenu" title={username} icon={<UserOutlined />}>
            <Menu.Item key="login" icon={<LogoutOutlined />}>
              <Link to='/' style={{paddingRight: '16px'}} onClick={handleLogout}>Logout</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="add-movie" icon={<InsertRowAboveOutlined />}>
            <Link to="/add-movie">Add Movie</Link>
          </Menu.Item>
        </Menu>
    </>
  );
};

export default Header;
