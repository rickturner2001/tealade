import type {
  CategoryWithProductCount,
  CurrencyType,
  ImportedProduct
} from "../../types";
import { createContext } from "react";


interface ProductContextValue {
  products: ImportedProduct[];
  categoriesWIthProductCount: CategoryWithProductCount[];
  setCurrency: (curr: CurrencyType) => void;
  currency: CurrencyType
}

const productContext = createContext<ProductContextValue>({
  products: [],
  categoriesWIthProductCount: [],
  setCurrency: () => {
    //(temp) unexpected empty method
  },
  currency: "USD",
});

export default productContext;

