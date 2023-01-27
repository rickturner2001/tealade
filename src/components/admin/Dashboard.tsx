import type { Dispatch, SetStateAction } from "react";
import type { Language } from "../../types";
import DashboardContext from "../context/DashboardContext";
import Main from "./Main";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function Dashboard({
  children,
  setLanguage,
  title,
  isMenuOpen,
  setIsMenuOpen,
}: {
  children?: JSX.Element;
  setLanguage: Dispatch<SetStateAction<Language>>;
  title: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) {
  return (
    <DashboardContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      <section>
        <Navbar setIsMenuOpen={setIsMenuOpen} setLanguage={setLanguage} />
        <div className="flex h-full w-full bg-gray-100">
          <SideMenu />
          <Main title={title}>{children}</Main>
        </div>
      </section>
    </DashboardContext.Provider>
  );
}
