import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ActionDropdown from "./navbar/ActionDropdown";
import StoreContext from "../context/StoreContext";

const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(StoreContext);
  return (
    <nav className="flex w-full items-center justify-between bg-neutral-900 py-3 px-6 text-white">
      <Link
        href={"/"}
        className="block px-5 py-2.5 text-2xl uppercase tracking-wider hover:bg-white/20"
      >
        Tealade
      </Link>
      <InputSearch />
      <ActionMenu />
      {/* Small Screens menu */}

      <button
        className="lg:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? (
          <XMarkIcon className="h-8 w-8" />
        ) : (
          <Bars3Icon className="h-8 w-8" />
        )}
      </button>
    </nav>
  );
};

const ActionMenu = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <Link
        href={"/login"}
        className=" hidden  py-2 px-4 text-base font-medium hover:bg-white/20 lg:block"
      >
        Sign in
      </Link>
    );
  }

  return <ActionDropdown username={sessionData.user?.name ?? undefined} />;
};

const InputSearch = () => {
  return (
    <div className="hidden w-full max-w-xl lg:block">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900"
      >
        Search
      </label>
      <div className="relative">
        <input
          id="default-search"
          className="block w-full  bg-white/20 p-2.5  text-sm text-white placeholder:text-white focus:border-teal-500 focus:outline-none focus:ring-teal-500"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button className="absolute bottom-[2px] right-[2px] my-auto h-max  px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none ">
          <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
