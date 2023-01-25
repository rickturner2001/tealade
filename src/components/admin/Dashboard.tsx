import { Dispatch, SetStateAction, useState } from "react";
import { Language } from "../../types";
import DashboardContext from "../context/DashboardContext";
import Main from "./Main";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function Dashboard({
  children,
  setLanguage,
  language,
  isListedProducts,
  title,
  isMenuOpen,
  setIsMenuOpen,
}: {
  children?: JSX.Element;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  isListedProducts?: boolean;
  title: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) {
  return (
    <DashboardContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <section>
        <Navbar
          language={language}
          setIsMenuOpen={setIsMenuOpen}
          setLanguage={setLanguage}
        />
        <div className="flex h-full w-full bg-gray-100">
          <SideMenu language={language} />
          <Main
            title={title}
            language={language}
            isListedProducts={isListedProducts}
          >
            {children}
          </Main>
        </div>
      </section>
    </DashboardContext.Provider>
  );
}
