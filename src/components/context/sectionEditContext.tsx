import { type Dispatch, type SetStateAction, createContext } from "react";

interface sectionEditValue {
  isEditingThumbnail: boolean;
  setIsEditingThumbnail: Dispatch<SetStateAction<boolean>>;
  setNewThumbnail: Dispatch<SetStateAction<string>>;
  newThumbnail: string;
  setIsAddingProducts: Dispatch<SetStateAction<boolean>>;
  isAddingProducts: boolean;
  newProducts: string[];
  setNewProducts: Dispatch<SetStateAction<string[]>>;
  sectionId: string;
}

const sectionEditContext = createContext<sectionEditValue>({
  isEditingThumbnail: false,
  newThumbnail: "",
  setIsEditingThumbnail: () => {
    //empty
  },
  setNewThumbnail: () => {
    //emtpy
  },
  isAddingProducts: false,
  newProducts: [],
  setIsAddingProducts: () => {
    //empty
  },
  setNewProducts: () => {
    //empty
  },
  sectionId: "",
});

export default sectionEditContext;
