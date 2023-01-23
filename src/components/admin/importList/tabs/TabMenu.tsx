import { Dispatch, SetStateAction, useContext } from "react";
import LanguageContext from "../../../context/LanugageContext";
import { Tabs } from "../ProductTab";

const TabMenu = ({
  setCurrentTab,
  currentTab,
}: {
  currentTab: Tabs;
  setCurrentTab: Dispatch<SetStateAction<Tabs>>;
}) => {
  const { language } = useContext(LanguageContext);

  const copy = {
    en: {
      product: "Product",
      description: "Description",
      variants: "Variants",
      images: "Images",
    },

    it: {
      product: "Prodotton",
      description: "Descrizione",
      variants: "Varianti",
      images: "Immagini",
    },
  };

  const currentCopy = language === "english" ? copy.en : copy.it;

  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 ">
      <ul className="-mb-px flex flex-wrap">
        <li className="mr-2">
          <button
            onClick={() => setCurrentTab("product")}
            className={`active inline-block rounded-t-lg border-b-2 p-4 text-sm ${
              currentTab === "product"
                ? "border-blue-600  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
          >
            {currentCopy.product}
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setCurrentTab("description")}
            className={`active inline-block rounded-t-lg border-b-2 p-4 text-sm ${
              currentTab === "description"
                ? "border-blue-600  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
            aria-current="page"
          >
            {currentCopy.description}
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setCurrentTab("variants")}
            className={`active inline-block rounded-t-lg border-b-2 p-4 text-sm ${
              currentTab === "variants"
                ? "border-blue-600  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
          >
            {currentCopy.variants}
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setCurrentTab("images")}
            className={`active inline-block rounded-t-lg border-b-2 p-4 text-sm ${
              currentTab === "images"
                ? "border-blue-600  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
          >
            {currentCopy.images}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TabMenu;
