import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HomeOutlined} from '@ant-design/icons';
import { Breadcrumb, Space} from "antd";

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div
        style={{
          padding: '0 70px',
          marginTop: 10,
          marginBottom: 10,
      }}
      >
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <HomeOutlined />
              <Link to="/"></Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item><Space ><HomeOutlined />List Movie</Space></Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>

    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
