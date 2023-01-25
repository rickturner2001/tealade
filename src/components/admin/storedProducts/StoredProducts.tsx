import { LayoutGroup, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { Language } from "../../../types";
import { api } from "../../../utils/api";
import LanguageContext from "../../context/LanugageContext";
import Dashboard from "../Dashboard";
import StoreProductGrid from "./StoredProductsGrid";

const StoredProducts = () => {
  const [language, setLanguage] = useState<Language>("english");
  const { data: importedProducts } =
    api.products.getAllImportedProducts.useQuery();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <LanguageContext.Provider value={{ language }}>
      <Dashboard
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        title={
          language === "english" ? "Store Products" : "Prodotti del negozio"
        }
        language={language}
        setLanguage={setLanguage}
      >
        <Fragment>
          <ContextMenu />
          <div className="flex flex-col ">
            <LayoutGroup>
              <motion.div layout className="px-0 py-12 md:px-24">
                <StoreProductGrid />
              </motion.div>
            </LayoutGroup>
          </div>
        </Fragment>
      </Dashboard>
    </LanguageContext.Provider>
  );
};

const ContextMenu = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-700 to-blue-500 py-6 opacity-80"></div>
  );
};

export default StoredProducts;
