import { motion } from "framer-motion";
import { type Dispatch, type SetStateAction, useState } from "react";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar({
  setIsMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { status, data: sessionData } = useSession();

  const [iseUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-start border-b bg-gray-50 p-3 shadow-md md:justify-between md:p-6">
      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2 font-medium text-gray-800"
        >
          <Bars3Icon className="h-6 w-6 " />
        </button>
      </div>
      {/* LOGO */}
      <div>
        <p className="text-xl md:text-2xl">Tealade</p>
      </div>
      <div className=" ml-6 flex items-center space-x-4 md:ml-0">
        <div className="relative h-full border-l border-gray-300" />
        {status === "authenticated" ? (
          <>
            <motion.div
              initial={{ visibility: "hidden", translateY: "200%", opacity: 0 }}
              animate={
                iseUserMenuOpen
                  ? { visibility: "visible", translateY: "150%", opacity: 1 }
                  : { visibility: "hidden", translateY: "200%", opacity: 0 }
              }
              className="absolute  right-2 w-52 translate-y-[4.5rem] rounded-md border bg-white p-2 shadow-sm"
            >
              <button
                onClick={() =>
                  void (async () => {
                    await signOut().catch((e) => console.error(e));
                  })()
                }
                className="w-full rounded-md bg-gray-800 p-2 text-sm font-bold text-white "
              >
                Sign out
              </button>
            </motion.div>
            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="flex space-x-1"
            >
              <UserIcon className="h-5 w-5" />
              <p className="hidden md:block">{sessionData.user?.name}</p>
              <div className="jutify-center flex items-center">
                <ChevronDownIcon className="h-3 w-3" />
                {/* USER MENU */}
              </div>
            </button>
          </>
        ) : (
          <Link
            className="mr-2  rounded-lg border bg-gray-100 px-2 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 md:px-5 md:py-2 "
            href={"/login"}
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
