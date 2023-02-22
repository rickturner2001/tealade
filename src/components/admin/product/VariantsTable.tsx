import { useContext } from "react";
import type { CjProductVariant } from "../../../types";
import LanguageContext from "../../context/LanugageContext";
import Image from "next/image";

const variantsCopy = {
  en: {
    name: "Name",
    height: "Height",
    width: "Width",
    cost: "Cost",
  },
  it: {
    name: "Nome",
    height: "Altezza",
    width: "Larghezza",
    size: "Taglia",
    cost: "Costo",
  },
};

const VariantsTable = ({ variants }: { variants: CjProductVariant[] }) => {
  const { language } = useContext(LanguageContext);

  const currentCopy =
    language === "english" ? variantsCopy.en : variantsCopy.it;

  return (
    <div className="mt-8 flex w-full flex-col overflow-x-auto px-3 md:px-12">
      <table className="`w-full">
        <thead className="border-b p-4 text-left">
          <tr className="p-4">
            <th className="p-4">Thumbnail</th>
            <th className="p-4  text-sm font-bold text-gray-800">
              {currentCopy.name}
            </th>
            <th className="p-4 text-sm font-bold text-gray-800">
              {currentCopy.height}
            </th>
            <th className="p-4 text-sm font-bold text-gray-800">
              {currentCopy.width}
            </th>
            <th className="p-4 text-sm font-bold text-gray-800">
              {currentCopy.cost}
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {variants.map((variant, idx) => {
            return (
              <tr className="p-4" key={idx}>
                <td className="p-4">
                  <Image
                    alt={variant.variantNameEn}
                    fill={true}
                    className="h-12  w-12 rounded-lg object-contain md:rounded-none"
                    src={variant.variantImage}
                  />
                </td>
                <td className="truncate text-ellipsis p-4 text-xs">
                  {variant.variantNameEn}
                </td>
                <td className="p-4">{variant.variantHeight} cm</td>
                <td className="p-4">{variant.variantWidth} cm</td>

                <td className="text-bold p-4">${variant.variantSellPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VariantsTable;
