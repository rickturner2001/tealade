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
    <div className="relative z-40 w-full bg-gradient-to-r from-blue-700/80 to-blue-500/80 py-6">
      <div className="space-between flex px-24">
        <label htmlFor="product search" className="sr-only">
          Search
        </label>

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
