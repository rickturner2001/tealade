import { createContext } from "react";

interface DashboardContextValue {
  isMenuOpen: boolean;
  setIsMenuOpen: (state: boolean) => void;
}

const DashboardContext = createContext<DashboardContextValue>({
  isMenuOpen: false,
  setIsMenuOpen: () => {
    // avoid non-empty method ts-error
    console.log(false);
  },
});

export default DashboardContext;
