import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Product, ProductVariant } from "@prisma/client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { NonNullableArrayIndex, ProductWithTags } from "../../../../types";
import LanguageContext from "../../../context/LanugageContext";
import SalesPriceMenu from "./SalesPriceMenu";

const copy = {
  en: {
    name: "Name",
    height: "Height",
    width: "Width",
    cost: "Product cost",
    shipping: "Shipping",
    salesPrice: "Sales price",
    profit: "Profit",
  },

  it: {
    name: "Nome",
    height: "Altezza",
    width: "Larghezza",
    cost: "Costo del prodotto",
    shipping: "Spedizione",
    salesPrice: "Prezzo di listino",
    profit: "Profitto",
  },
};

const ProductVariants = ({
  product,
  variantPrices,
  setVariantPrices,
}: {
  product: Readonly<ProductWithTags>;
  variantPrices: number[];
  setVariantPrices: Dispatch<SetStateAction<number[]>>;
}) => {
  const { language } = useContext(LanguageContext);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSalesPriceMenu, setIsSalesPriceMenu] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isButtonClicked) {
        const innerComponent = document.getElementById(
          "salesPriceMenu_" + product.pid
        );
        if (
          innerComponent &&
          !innerComponent.contains(e.target as Node) &&
          (e.target as HTMLElement).id !== "salesPriceMenu_" + product.pid
        ) {
          setIsSalesPriceMenu(false);
        }
      } else {
        setIsButtonClicked(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setIsSalesPriceMenu, isSalesPriceMenu, isButtonClicked]);

  const currentCopy = language === "english" ? copy.en : copy.it;
  return (
    <div className="w-full overflow-x-auto p-12">
      <table className="text-xs">
        <thead>
          <tr>
            <th className="p-4 font-medium">Tumbnail</th>
            <th className="p-4 text-start font-medium">{currentCopy.name}</th>
            <th className="p-4 font-medium">{currentCopy.height}</th>
            <th className="p-4 font-medium">{currentCopy.width}</th>
            <th className="p-4 font-medium">{currentCopy.cost}</th>
            <th className="p-4 font-medium">{currentCopy.shipping}</th>
            <th className="p-4 font-medium">
              <span className="relative  inline-flex items-center">
                {currentCopy.salesPrice}{" "}
                <button
                  onClick={() => {
                    {
                      setIsButtonClicked(true);
                      setIsSalesPriceMenu(true);
                    }
                  }}
                  className="ml-2"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
                <SalesPriceMenu
                  setVariantPrices={setVariantPrices}
                  language={language}
                  variants={product.variants}
                  isVisible={isSalesPriceMenu}
                  id={"salesPriceMenu_" + product.pid}
                />
              </span>
            </th>
            <th className="p-4 font-medium">{currentCopy.profit}</th>
          </tr>
        </thead>
        <tbody>
          {product.variants.map((variant, idx) => {
            return (
              <VariantRow
                key={idx}
                index={idx}
                variantPrices={variantPrices}
                setVariantPrices={setVariantPrices}
                variant={variant}
                product={product}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const VariantRow = ({
  variant,
  index,
  setVariantPrices,
  variantPrices,
  product,
}: {
  index: NonNullableArrayIndex<number[]>;
  variantPrices: number[];
  variant: Readonly<ProductVariant>;
  setVariantPrices: Dispatch<SetStateAction<number[]>>;
  product: Readonly<ProductWithTags>;
}) => {
  const regularShipment = product.shipments[0];
  const economyShipment = product.shipments[1];

  const [inputValue, setInputValue] = useState(
    ((variantPrices[index] as number) + (economyShipment?.cost ?? 0)).toString()
  );

  const profit = (variantPrices[index] ?? 0) - variant.price;

  useEffect(() => {
    setInputValue(
      ((variantPrices[index] as number) + (economyShipment?.cost ?? 0))
        .toFixed(2)
        .toString()
    );
  }, [variantPrices]);

  const handlePriceChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const handleBlur = useCallback(() => {
    setVariantPrices((prev) => {
      const currentPrices = [...prev];
      currentPrices[index] = +inputValue;
      return currentPrices;
    });
  }, [index, inputValue, setVariantPrices]);
  return (
    <tr className="border-t border-b p-4 text-center text-xs">
      <td className="p-2">
        <img src={variant.thumbnail} className="w-20 object-cover" />
      </td>
      <td className="text- p-4 text-start">{variant.variantName}</td>
      <td className="p-4">{variant.height} cm</td>
      <td className="p-4">{variant.width} cm</td>
      <td className="p-4 font-semibold">${variant.price}</td>
      <td className="p-4">
        <div className="flex space-x-2">
          {regularShipment && (
            <span className="rounded-md bg-blue-500 p-2 text-white">
              ${regularShipment.cost}
            </span>
          )}
          {economyShipment && (
            <span className="rounded-md border bg-gray-100 p-2 text-gray-800">
              ${economyShipment.cost}
            </span>
          )}
        </div>
      </td>
      <td className="p-4">
        <span className="inline-flex h-max items-center rounded-md bg-gray-100 py-2 px-2">
          ${" "}
          <input
            className="ml-4 w-24 bg-gray-100 p-2 focus:outline-none"
            type={"number"}
            value={inputValue}
            onChange={handlePriceChange}
            onBlur={handleBlur}
          />
        </span>
      </td>
      <td className={`p-4 ${profit > 0 ? "text-green-500" : "text-red-500"}`}>
        ${profit.toFixed(2)}
      </td>
    </tr>
  );
};

export default ProductVariants;
