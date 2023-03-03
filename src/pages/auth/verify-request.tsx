import { motion } from "framer-motion";
import { CheckIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Result } from "antd";

const VerifyRequest = () => {
  const router = useRouter();

  const [currentEmail, setCurrentEmail] = useState<string | null>();
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const newEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentEmail(localStorage.getItem("emailVerification"));
  }, []);

  if (typeof currentEmail === "string" && currentEmail === "") {
    async () => await router.push("/login");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Result
        status="success"
        title={`Welcome aboard ${currentEmail ?? "Guest"}`}
        subTitle="Check out your private inbox! We just sent you an email to confirm your identity."
        extra={[
          <Button key="buy" href="/login">
            Go back
          </Button>,
        ]}
      />
    </div>
  );
};

const verifyRequest = () => {
  return <VerifyRequest />;
};

export default verifyRequest;
