import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Language } from "../../types";
import { api } from "../../utils/api";
import CategoryScrolldown from "./subComponents/dropdowns";
import ListProductDisplay from "./subComponents/ListProductDisplay";

const copy = {
  en: {
    header: "Find Products",
    searchPlaceholder: "Search Products",
  },
  ita: {
    header: "Trova Prodotti",
    searchPlaceholder: "Cerca prodotti",
  },
};

export default function Main({
  language,
  children,
}: {
  language: Language;
  children?: JSX.Element;
}) {
  const currentCopy = language === "english" ? copy.en : copy.ita;

  const { data: categories } = api.products.getAllCategories.useQuery();
  const [productSpecificPid, setProductSpecificPid] = useState("");

  return (
    <main className="flex h-full w-full flex-col bg-blue-50">
      <div className="flex w-full flex-col">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-12 px-24">
          <h1 className="text-2xl font-semibold text-white">
            {currentCopy.header}
          </h1>
        </div>
        <div className="w-full bg-gradient-to-r from-blue-700 to-blue-500 py-6 opacity-80">
          <div className="space-between flex px-24">
            <label htmlFor="product search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-1/2 rounded-md bg-blue-500 p-2.5 pl-10 text-sm text-white placeholder:text-white focus:outline-none"
                placeholder={currentCopy.searchPlaceholder}
                required
              />
            </div>
            {categories && categories[0] && (
              <CategoryScrolldown
                categories={categories}
                defaultSelection={categories[0]}
              />
            )}
          </div>
        </div>
        {children ? children : <ListProductDisplay language={language} />}
      </div>
    </main>
  );
}
