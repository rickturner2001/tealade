import React, { useState } from "react";
import { Breadcrumb, Space, type MenuProps } from "antd";
import { Layout, Menu } from "antd";
import {
  ArchiveBoxArrowDownIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

const AdminDashboardLayout = ({
  breadCrumbs,
  children,
}: {
  breadCrumbs: JSX.Element[];
  children: JSX.Element;
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Find products",
      icon: (
        <Link href={"/admin/find-products/1"}>
          <MagnifyingGlassIcon className="strke-2 h-4 w-4" />
        </Link>
      ),
    },
    {
      key: "2",
      label: "Import list",
      icon: (
        <Link href={"/admin/import-list"}>
          <ArchiveBoxArrowDownIcon className="h-4 w-4 stroke-2" />
        </Link>
      ),
    },
    {
      key: "3",
      label: "Imported products",
      icon: (
        <Link href={"/admin"}>
          <BuildingStorefrontIcon className="h-4 w-4 stroke-2" />
        </Link>
      ),
    },
    {
      key: "4",
      label: "Section builder",
      icon: <WrenchScrewdriverIcon className="h-4 w-4 stroke-2" />,
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
          <Space align="center" className="w-full justify-center">
            <h1 className="text-center text-lg font-medium uppercase tracking-widest text-white">
              Tealade
            </h1>
          </Space>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb className="px-8 py-4">
            <Breadcrumb.Item href="/admin">Admin dashboard</Breadcrumb.Item>
            {breadCrumbs}
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Tealade ©2023 Tealade admin dashboard
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardLayout;
