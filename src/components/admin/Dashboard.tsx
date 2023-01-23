import { Dispatch, SetStateAction, useState } from "react";
import { Language } from "../../types";
import Main from "./Main";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function Dashboard({
  children,
  setLanguage,
  language,
  isListedProducts,
  title,
}: {
  children?: JSX.Element;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  isListedProducts?: boolean;
  title: string;
}) {
  return (
    <section>
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="flex h-full w-full">
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
  );
}
