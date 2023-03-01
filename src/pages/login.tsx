import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/admin/Navbar";
import Spinner from "../components/Spinner";
// import loginBg from "../../public/media/images/bg.jpg";

const SignIn = () => {
  const { status } = useSession();
  const router = useRouter();

  const menuState = useState(false);
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [isMissingEmail, setIsMissingEmail] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.back();
    }
  }, [status, router]);

  if (status === "loading") {
    return <div></div>;
  }

  return (
    <div className="flex h-screen w-screen flex-col ">
      <Navbar setIsMenuOpen={menuState[1]} />
      <div className="relative flex h-full items-center justify-center bg-neutral-800">
        <div className="relative z-20 max-w-7xl rounded-md border bg-white p-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 md:mb-4 md:text-4xl">
            Sign up with email
          </h1>
          <p className="text-sm md:text-base">
            or sign up with{" "}
            <button
              onClick={() => {
                signIn("google").catch((e) => console.error(e));
              }}
              className=" text-sm font-medium text-primary-600 underline underline-offset-2 md:text-base"
            >
              google
            </button>{" "}
            instead
          </p>
          <div className="mb-8 mt-8 flex flex-col space-y-1 md:mb-8 md:mt-12">
            <label className="font-medium text-gray-800">full name</label>
            <input
              className="w-full rounded-lg border border-secondary-800 p-3 shadow-sm shadow-secondary-500/20 placeholder:text-gray-600 focus:outline-none"
              placeholder="Your full name"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-800">
              email address<span className="ml-0.5 text-red-500">*</span>
            </label>
            <input
              ref={emailRef}
              className={`w-full rounded-lg border  p-3 shadow-sm shadow-blue-500/20 ${
                isMissingEmail ? "border-red-600" : "border-secondary-800"
              } placeholder:text-gray-600 focus:outline-none`}
              placeholder="Your email address"
            />
            {isMissingEmail && (
              <p className="inline-flex items-center justify-start text-xs font-medium text-red-700">
                <ExclamationTriangleIcon className="mr-2 mt-1 h-5 w-5 text-red-700" />{" "}
                Email address is required
              </p>
            )}
          </div>

          <button
            onClick={() =>
              void (() => {
                if (emailRef?.current?.value) {
                  signIn("email", {
                    email: emailRef.current.value,
                    name: nameRef?.current?.value ?? null,
                  }).catch((e) => console.error(e));

                  localStorage.setItem(
                    "emailVerification",
                    emailRef.current.value
                  );
                  setIsButtonClick(true);
                } else {
                  setIsMissingEmail(true);
                  emailRef?.current?.focus();
                }
              })()
            }
            className="mt-12 inline-flex w-full items-center justify-center  rounded-md bg-primary-500 py-3 text-center font-bold text-white"
          >
            {isButtonClick && (
              <Spinner className=" mr-2 inline h-4 w-4 animate-spin text-white" />
            )}
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

const signin = () => {
  return <SignIn />;
};

export default signin;
