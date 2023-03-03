import React, { useState } from "react";
import {
  Breadcrumb,
  Space,
  type MenuProps,
  Button,
  Avatar,
  Dropdown,
} from "antd";
import { Layout, Menu } from "antd";
import {
  ArchiveBoxArrowDownIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const AdminDashboardLayout = ({
  breadCrumbs,
  children,
}: {
  breadCrumbs: JSX.Element[];
  children: JSX.Element;
}) => {
  const { data, status } = useSession();

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

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <Button
          type="primary"
          onClick={() => void (async () => await signOut())()}
          className="bg-blue-500"
        >
          Sign out
        </Button>
      ),
      key: "sign out",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsedWidth={0} collapsible>
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
        <Header className="bg-white px-8">
          <Space align="center" className="w-full items-center justify-between">
            <span className="invisible hidden md:visible md:block"></span>
            <h1 className="text-lg font-medium uppercase tracking-widest text-neutral-900 md:text-center ">
              Tealade
            </h1>
            {status === "authenticated" ? (
              <Dropdown trigger={["click"]} menu={{ items: dropdownItems }}>
                <Avatar
                  icon={
                    data.user?.image ? (
                      <img
                        className="h-full w-full"
                        alt="user icon"
                        src={data.user.image}
                      />
                    ) : (
                      <UserOutlined />
                    )
                  }
                />
              </Dropdown>
            ) : (
              <Button href="/login" type="primary" className="bg-blue-500">
                Sign up
              </Button>
            )}
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
