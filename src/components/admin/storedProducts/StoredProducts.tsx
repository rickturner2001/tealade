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

  return (
    <LanguageContext.Provider value={{ language }}>
      <Dashboard
        title={
          language === "english" ? "Store Products" : "Prodotti del negozio"
        }
        language={language}
        setLanguage={setLanguage}
      >
        <Fragment>
          <ContextMenu />
          <div className="flex flex-col ">
            {importedProducts &&
              importedProducts.map((prod) => {
                return (
                  <LayoutGroup key={prod.pid}>
                    <motion.div layout key={prod.pid} className="px-24 py-12">
                      <StoreProductGrid />
                    </motion.div>
                  </LayoutGroup>
                );
              })}
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
