import { LayoutGroup, motion } from "framer-motion";
import { Fragment, useState } from "react";
import type { Language } from "../../../types";
import LanguageContext from "../../context/LanugageContext";
import Dashboard from "../Dashboard";
import StoreProductGrid from "./StoredProductsGrid";

const StoredProducts = () => {
  const [language, setLanguage] = useState<Language>("english");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <LanguageContext.Provider value={{ language }}>
      <Dashboard
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        title={
          language === "english" ? "Store Products" : "Prodotti del negozio"
        }
        setLanguage={setLanguage}
      >
        <Fragment>
          <ContextMenu />
          <div className="flex flex-col ">
            <LayoutGroup>
              <motion.div layout className="px-0 py-12 md:px-12">
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
