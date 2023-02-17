import { Fragment, useState } from "react";
import LanguageContext from "../../components/context/LanugageContext";
import type { Language } from "../../types";
import Dashboard from "../../components/admin/Dashboard";
import BuilderLayout from "./builder/BuilderLayout";

const Builder = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("english");

  return (
    <LanguageContext.Provider value={{ language }}>
      <Dashboard
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        title={
          language === "english" ? "Section Builder" : "Costruisci Sezione"
        }
        setLanguage={setLanguage}
      >
        <Fragment>
          <ContextMenu />
          <div className="flex flex-col ">
            <BuilderLayout />
          </div>
        </Fragment>
      </Dashboard>
    </LanguageContext.Provider>
  );
};

const ContextMenu = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-700 to-blue-500/80 py-6 "></div>
  );
};

export default Builder;
