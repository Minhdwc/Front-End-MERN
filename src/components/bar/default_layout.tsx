import React from "react";
import { Layout } from "antd";
import HeaderComponent from "../layouts/Header/header";
import FooterComponent from "../layouts/Footer/Footer";
import Sidebar from "../UI/Sidebar";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Layout.Header>
        <HeaderComponent />
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      <Layout.Footer>
        <FooterComponent />
      </Layout.Footer>
    </>
  );
};

const DefaultMainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Layout.Content>{children}</Layout.Content>
    </>
  );
};

const DefaultLayoutAdmin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export { DefaultLayout, DefaultMainLayout, DefaultLayoutAdmin };
