import { createContext } from "react";
import { Language } from "../../types";

interface LanguageContextValue {
  language: Language;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "english",
});

export default LanguageContext;
