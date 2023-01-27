import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";

const VerifyRequest = () => {
  const router = useRouter();

  const [currentEmail, setCurrentEmail] = useState<string | null>();
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const newEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentEmail(localStorage.getItem("emailVerification"));
  }, []);

  if (typeof currentEmail === "string" && currentEmail === "") {
    async () => await router.push("/login");
  }

  return (
    <div className="flex  h-screen w-screen flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-400">
      <div className="max-w-2xl rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Email Confirmation
        </h1>
        <p className=" max-w-lg text-gray-700">
          Check out your private inbox! We just sent you an email to confirm
          your identity.
        </p>
        <div className="mt-6 flex flex-col justify-center space-y-1">
          <div className="mb-6 flex max-w-sm flex-col">
            <motion.p
              initial={{ visibility: "visible", opacity: 1 }}
              animate={
                isChangingEmail
                  ? { opacity: 0, visibility: "hidden", position: "absolute" }
                  : {
                      opacity: 1,
                      visibility: "visible",
                      position: "relative",
                    }
              }
              className="font-medium "
            >
              {currentEmail}
            </motion.p>
            <motion.input
              ref={newEmailRef}
              initial={{ visibility: "hidden", opacity: 0 }}
              animate={
                isChangingEmail
                  ? {
                      opacity: 1,
                      visibility: "visible",
                      position: "relative",
                    }
                  : { opacity: 0, visibility: "hidden", position: "absolute" }
              }
              className={
                "rounded-md border border-teal-800 p-3 text-sm ring ring-transparent focus:border-none focus:outline-none focus:ring-teal-500"
              }
              onChange={(e) => setCurrentEmail(e.target.value)}
              defaultValue={currentEmail as string}
            />
          </div>
          <div className="flex justify-end space-x-4 text-sm">
            <button
              onClick={() => {
                setIsChangingEmail((prev) => !prev);
                setTimeout(() => {
                  newEmailRef?.current?.focus();
                }, 100);
              }}
              className="self-end text-sm text-teal-800 underline underline-offset-4"
            >
              change email
            </button>
            <button
              onClick={() =>
                void (() => {
                  signIn("email", { email: currentEmail }).catch((e) =>
                    console.error(e)
                  );
                })()
              }
              className="inline-flex items-center justify-center rounded-md bg-teal-600 p-2 font-bold text-white"
            >
              <EnvelopeIcon className="h-5 w-5 font-bold" />

              <span className="pl-2"> send again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const verifyRequest = () => {
  return <VerifyRequest />;
};

export default verifyRequest;
