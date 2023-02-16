import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import type { Category } from "@prisma/client";
import type { NextPage } from "next";
import React, { useContext, useState } from "react";
import Dashboard from "../../components/admin/Dashboard";
import CategoryScrolldown from "../../components/admin/subComponents/dropdowns";
import PrivateRoute from "../../components/layouts/PrivateRoute";
import type { Language, NonEmptyArray } from "../../types";
import { api } from "../../utils/api";
import LanguageContext from "../../components/context/LanugageContext";

const copy = {
  en: {
    searchPlaceholder: "Search Products",
  },
  ita: {
    searchPlaceholder: "Cerca prodotti",
  },
};

export const ContextMenu = () => {
  const { language } = useContext(LanguageContext);

  const currentCopy = language === "english" ? copy.en : copy.ita;
  const { data: categories } = api.products.getAllCategories.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <div className="relative z-40 w-full bg-gradient-to-r from-blue-700 to-blue-500 py-6 opacity-80">
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
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories as NonEmptyArray<Category>}
            defaultSelection={categories[0]}
          />
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const [language, setLanguage] = useState<Language>("english");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Dashboard
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      title={language === "english" ? "Find products" : "Cerca prodotti"}
      setLanguage={setLanguage}
    >
      <ContextMenu />
    </Dashboard>
  );
};

const admin: NextPage = () => {
  return (
    <PrivateRoute>
      <Admin />
    </PrivateRoute>
  );
};

export default admin;
