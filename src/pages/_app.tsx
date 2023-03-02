import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { App, ConfigProvider } from "antd";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: "#F0B429",
          },
        }}
      >
        <App>
          <Component {...pageProps} />
        </App>
      </ConfigProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
