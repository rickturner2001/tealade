import { type ShopSection } from "@prisma/client";
import { type Dispatch, type SetStateAction, createContext } from "react";

interface SectionContextValue {
  selectedSection: ShopSection | null;
  setSelectedSection: Dispatch<SetStateAction<ShopSection | null>>;
}

const SectionsContext = createContext<SectionContextValue>({
  selectedSection: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedSection: () => {},
});

export default SectionsContext;
