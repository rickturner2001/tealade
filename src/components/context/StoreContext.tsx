import { Dispatch, SetStateAction, createContext } from "react";

interface StoreContextValue {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const StoreContext = createContext<StoreContextValue>({
  isMenuOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsMenuOpen: () => {},
});

export default StoreContext;
