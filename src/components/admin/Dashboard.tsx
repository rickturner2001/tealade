import { Dispatch, SetStateAction, useState } from "react";
import { Language } from "../../types";
import Main from "./Main";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function Dashboard({
  children,
  setLanguage,
  language,
}: {
  children?: JSX.Element;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}) {
  return (
    <section>
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="flex h-full w-full">
        <SideMenu language={language} />
        <Main language={language}>{children}</Main>
      </div>
    </section>
  );
}
