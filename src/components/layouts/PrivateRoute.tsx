import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    async onUnauthenticated() {
      await router.push("/login");
    },
  });

  if (status === "loading") {
    return <div></div>;
  }
  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
