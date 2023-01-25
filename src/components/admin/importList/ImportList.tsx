import { LayoutGroup, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { Language } from "../../../types";
import { api } from "../../../utils/api";
import LanguageContext from "../../context/LanugageContext";
import Dashboard from "../Dashboard";
import ProductTab from "./ProductTab";
import notFound from "../../../../public/media/images/not-found.png";
import Link from "next/link";

const ImportList = () => {
  const [language, setLanguage] = useState<Language>("english");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: importedProducts } =
    api.products.getAllImportedProducts.useQuery();

  const copy = {
    en: {
      notFound: "Could not find any products",
      findProducsts: "Find Products",
    },
    it: {
      notFound: "Nessun prodotto listato",
      findProducsts: "Trova prodotti",
    },
  };

  return (
    <LanguageContext.Provider value={{ language }}>
      <Dashboard
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        title={language === "english" ? "Import list" : "Lista importi"}
        language={language}
        setLanguage={setLanguage}
      >
        <Fragment>
          <ContextMenu />
          <div className="flex flex-col ">
            {importedProducts && importedProducts.length > 0 ? (
              importedProducts.map((prod) => {
                return (
                  <LayoutGroup key={prod.pid}>
                    <motion.div
                      layout
                      key={prod.pid}
                      className="px-6 py-12 md:px-24"
                    >
                      <div className="w-full rounded-xl bg-white shadow-lg">
                        <ProductTab product={prod} />
                      </div>
                    </motion.div>
                  </LayoutGroup>
                );
              })
            ) : (
              <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-24">
                <img
                  src={notFound.src}
                  className=" mb-12 h-96 object-cover"
                  alt="not found"
                />
                {language === "english" ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-center text-2xl font-bold">
                      {copy.en.notFound}
                    </p>
                    <Link
                      href={"/admin/find-products/1"}
                      className="mt-4 w-full rounded-md bg-emerald-400 py-4 px-8 text-center text-sm font-bold text-white"
                    >
                      {copy.en.findProducsts}
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p className="text-center text-2xl font-bold">
                      {copy.it.notFound}
                    </p>
                    <Link
                      href={"/admin/find-products/1"}
                      className="mt-4 w-full rounded-md bg-emerald-400 py-4 px-8 text-center text-sm font-bold text-white"
                    >
                      {copy.it.findProducsts}
                    </Link>
                  </div>
                )}
              </div>
            )}
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
