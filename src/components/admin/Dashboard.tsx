import type { Dispatch, SetStateAction } from "react";
import type { Language, SideMenuSection } from "../../types";
import DashboardContext from "../context/DashboardContext";
import Main from "./Main";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function Dashboard({
  children,
  title,
  isMenuOpen,
  setIsMenuOpen,
  currentSection,
  setCurrentSection,
}: {
  children?: JSX.Element;
  title: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  currentSection: SideMenuSection;
  setCurrentSection: Dispatch<SetStateAction<SideMenuSection>>;
}) {
  return (
    <DashboardContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, currentSection, setCurrentSection }}
    >
      <section>
        <Navbar setIsMenuOpen={setIsMenuOpen} />
        <div className="flex h-full w-full bg-gray-100">
          <SideMenu />
          <Main title={title}>{children}</Main>
        </div>
      </section>
    </DashboardContext.Provider>
  );
}
