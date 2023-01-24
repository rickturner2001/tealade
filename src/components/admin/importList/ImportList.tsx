import { LayoutGroup, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { Language } from "../../../types";
import { api } from "../../../utils/api";
import LanguageContext from "../../context/LanugageContext";
import Dashboard from "../Dashboard";
import ProductTab from "./ProductTab";
import categoriesData from "../../../../categories.json";

const ImportList = () => {
  const [language, setLanguage] = useState<Language>("english");
  const { data: importedProducts } =
    api.products.getAllImportedProducts.useQuery();

  return (
    <LanguageContext.Provider value={{ language }}>
      <Dashboard
        title={language === "english" ? "Import list" : "Lista importi"}
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
                      <div className="w-full rounded-xl bg-white shadow-lg">
                        <ProductTab product={prod} />
                      </div>
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

export default ImportList;
