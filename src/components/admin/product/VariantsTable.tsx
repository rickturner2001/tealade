import { useContext } from "react";
import { Language, CjProductVariant } from "../../../types";
import LanguageContext from "../../context/LanugageContext";

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
    <div className="mt-8 flex w-full flex-col px-12">
      <table className="`w-full">
        <thead className="border-b p-4 text-left">
          <th className="p-4"></th>
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
        </thead>
        <tbody className="text-sm">
          {variants.map((variant, idx) => {
            return (
              <tr className="p-4" key={idx}>
                <td className="p-4">
                  <img
                    className="h-12  w-12 object-contain"
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
