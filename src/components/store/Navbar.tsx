import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="relative z-40 flex w-screen items-center justify-between   border-b border-b-white/20 bg-blue-600 text-white shadow-md">
      {/* Hamburger (mobile) */}
      <div className="border-r border-r-white/20 p-5 md:hidden">
        <Bars3Icon className="h-5 w-5" />
      </div>
      <div className="hidden items-center border-r border-r-white/20 md:flex">
        <button aria-label="query products by keyword" className=" py-6 px-8">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
      <div>
        <span className="inline-block pr-6 text-2xl font-semibold uppercase md:pr-0">
          Tealade
        </span>
      </div>
      <ul role={"list"} className="hidden items-center md:flex">
        <li
          role={"listitem"}
          className="flex items-center border-r border-r-white/20 p-6"
        >
          <button>
            <UserIcon className="h-5 w-5" />
          </button>
        </li>
        <li
          role={"listitem"}
          className="flex items-center border-r border-r-white/20 p-6"
        >
          <button>
            <HeartIcon className="h-5 w-5" />
          </button>
        </li>
        <li
          role={"listitem"}
          className="flex items-center border-r border-r-white/20 p-6"
        >
          <button>
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
