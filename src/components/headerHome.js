/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { 
  LoginOutlined
 } from '@ant-design/icons';

const centerStyle = {
  padding: '0 50px',
  marginBottom: 10,
};


const HeaderHome = () => {
  return (
    <>
        <Menu mode="horizontal" theme='dark' style={centerStyle}>
          <Menu.Item key="login" icon={<LoginOutlined />}>
            <Link to='/login' style={{paddingRight: '16px'}}>Login</Link>
          </Menu.Item>
        </Menu>
    </>
  );
};

export default HeaderHome;
