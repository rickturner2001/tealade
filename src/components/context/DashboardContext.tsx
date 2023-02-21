import { type Dispatch, type SetStateAction, createContext } from "react";
import type { SideMenuSection } from "../../types";

interface DashboardContextValue {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  currentSection: SideMenuSection;
  setCurrentSection: Dispatch<SetStateAction<SideMenuSection>>;
}

const DashboardContext = createContext<DashboardContextValue>({
  isMenuOpen: false,

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsMenuOpen: () => {},

  currentSection: "imported products",

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentSection: () => {},
});

export default DashboardContext;
