import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Language } from "../../types";

export default function SideMenu({ language }: { language: Language }) {
  const copy = {
    en: {
      storeRedirect: "Store",
      findProducts: "Find products",
    },
    ita: {
      storeRedirect: "Negozio",
      findProducts: "Trova prodotti",
    },
  };
  const currentCopy = language === "english" ? copy.en : copy.ita;

  return (
    <aside className=" flex min-h-screen w-72 flex-col space-y-6 border-r bg-gray-50 py-6 px-4 shadow-lg ">
      <a
        href="/"
        className="flex w-full  cursor-pointer items-center justify-center space-x-2 border border-dashed border-teal-800 px-5 py-2 text-teal-800 transition-all duration-200 hover:bg-gray-50"
      >
        <ShoppingBagIcon className="h-5 w-5" />
        <span className="text-center text-sm font-medium">
          {currentCopy.storeRedirect}
        </span>
      </a>
      <div className="flex items-center space-x-2 rounded-md px-4 py-2 transition-all duration-200 hover:bg-gray-100">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
        <span className="text-sm text-gray-700">
          {currentCopy.findProducts}
        </span>
      </div>
    </aside>
  );
}
