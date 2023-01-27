import { createContext } from "react";
import type { Language } from "../../types";

interface LanguageContextValue {
  language: Language;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "english",
});

export default LanguageContext;
