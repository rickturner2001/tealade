import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Language } from "../../types";
import { api } from "../../utils/api";

const copy = {
  en: {
    storeRedirect: "Store",
    findProducts: "Find products",
    importList: "Import list",
    importedProducts: "Imported products",
  },
  ita: {
    storeRedirect: "Negozio",
    findProducts: "Trova prodotti",
    importList: "Lista importi",
    importedProducts: "Prodotti importati",
  },
};

export default function SideMenu({ language }: { language: Language }) {
  const { data: importedProduct } =
    api.products.getAllImportedProducts.useQuery();

  const { data: storeProducts } = api.products.getAllStoreProducts.useQuery();

  const currentCopy = language === "english" ? copy.en : copy.ita;

  return (
    <aside className=" sticky top-24 left-0  flex h-[90.5vh] w-72 flex-col space-y-6 border-r bg-gray-50 py-6 px-4 shadow-lg ">
      <Link
        href="/"
        className=" flex w-full  cursor-pointer items-center justify-center space-x-2 border border-dashed border-teal-800 px-5 py-2 text-teal-800 transition-all duration-200 hover:bg-gray-50"
      >
        <ShoppingBagIcon className="h-5 w-5" />
        <span className="text-center text-sm font-medium">
          {currentCopy.storeRedirect}
        </span>
      </Link>
      <Link
        href={"/admin/find-products/1"}
        className="flex cursor-pointer items-center space-x-2 rounded-md px-4 py-2 transition-all duration-200 hover:bg-gray-100"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
        <span className="text-sm text-gray-700">
          {currentCopy.findProducts}
        </span>
      </Link>
      <Link
        href="/admin/import-list"
        className="flex cursor-pointer items-center space-x-2 rounded-md px-4 py-2 transition-all duration-200 hover:bg-gray-100"
      >
        <ArchiveBoxArrowDownIcon className="h-5 w-5 text-gray-700" />
        <span className="text-sm text-gray-700">{currentCopy.importList}</span>
        <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-800">
          {importedProduct ? importedProduct.length : "?"}
        </span>
      </Link>
      <Link
        href="/admin/store-items"
        className="flex cursor-pointer items-center space-x-2 rounded-md px-4 py-2 transition-all duration-200 hover:bg-gray-100"
      >
        <BuildingStorefrontIcon className="h-5 w-5 text-gray-700" />
        <span className="text-sm text-gray-700">
          {currentCopy.importedProducts}
        </span>
        <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-800">
          {storeProducts ? storeProducts.length : "?"}
        </span>
      </Link>
    </aside>
  );
}
