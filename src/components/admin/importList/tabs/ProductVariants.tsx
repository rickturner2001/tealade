import { ProductVariant } from "@prisma/client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { NonNullableArrayIndex, ProductWithTags } from "../../../../types";
import LanguageContext from "../../../context/LanugageContext";

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
  product: ProductWithTags;
  variantPrices: number[];
  setVariantPrices: Dispatch<SetStateAction<number[]>>;
}) => {
  const { language } = useContext(LanguageContext);

  const currentCopy = language === "english" ? copy.en : copy.it;
  const variants = product.variants;

  return (
    <div className="w-full p-12">
      <table className="text-sm">
        <thead>
          <tr>
            <th className="p-4 font-medium"></th>
            <th className="p-4 text-start font-medium">{currentCopy.name}</th>
            <th className="p-4 font-medium">{currentCopy.height}</th>
            <th className="p-4 font-medium">{currentCopy.width}</th>
            <th className="p-4 font-medium">{currentCopy.cost}</th>
            <th className="p-4 font-medium">{currentCopy.shipping}</th>
            <th className="p-4 font-medium">{currentCopy.salesPrice}</th>
            <th className="p-4 font-medium">{currentCopy.profit}</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, idx) => {
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
  variant: ProductVariant;
  variantPrices: number[];
  setVariantPrices: Dispatch<SetStateAction<number[]>>;
  product: ProductWithTags;
}) => {
  const regularShipment = product.shipments[0];
  const economyShipment = product.shipments[1];

  const salesPrice =
    (variantPrices[index] as NonNullable<(typeof variantPrices)[number]>) +
    (economyShipment?.cost ?? 0);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setVariantPrices((prev) => {
      const currentPrices = [...prev];
      currentPrices[index] = +value;
      return currentPrices;
    });
  };
  const profit =
    (variantPrices[index] as NonNullable<(typeof variantPrices)[number]>) -
    variant.price -
    (economyShipment?.cost ?? 0);

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
            defaultValue={salesPrice.toFixed(2)}
            onChange={handlePriceChange}
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
