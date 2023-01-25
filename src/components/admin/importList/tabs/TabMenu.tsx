import { Category, ProductVariant } from "@prisma/client";
import { Dispatch, RefObject, SetStateAction, useContext } from "react";
import { api } from "../../../../utils/api";
import LanguageContext from "../../../context/LanugageContext";
import Spinner from "../../../Spinner";
import { Tabs } from "../ProductTab";

type VariantListing = {
  height: number;
  image: string;
  name: string;
  price: number;
  vid: string;
  width: number;
};

const TabMenu = ({
  productNameRef,
  productCategory,
  productDescription,
  productImages,
  productVariants,
  setCurrentTab,
  currentTab,
  pid,
}: {
  productCategory: Category | null;
  productNameRef: RefObject<HTMLInputElement>;
  productDescription: string;
  productImages: string[];
  productVariants: VariantListing[];
  pid: string;
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
      importToStore: "Import to store",
      removeProduct: "Remove product",
    },

    it: {
      product: "Prodotton",
      description: "Descrizione",
      variants: "Varianti",
      images: "Immagini",
      importToStore: "Aggiungi al negozio",

      removeProduct: "Rimuovi prodotto",
    },
  };

  const utils = api.useContext();

  const { mutate: deleteProduct, isLoading } =
    api.products.deleteProduct.useMutation({
      onSuccess: () => {
        utils.products.invalidate().catch((e) => console.error(e));
      },
    });

  const { mutate: finalizeListing, isLoading: loadingFinalization } =
    api.products.finalizeProductListing.useMutation({
      onSuccess: () => {
        utils.products.invalidate().catch((e) => console.error(e));
      },
    });

  const currentCopy = language === "english" ? copy.en : copy.it;

  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 ">
      <ul className="-mb-px flex flex-wrap py-2 px-2 md:py-4">
        <li>
          <button
            onClick={() => setCurrentTab("product")}
            className={`active inline-block rounded-t-lg  p-2 py-4 text-sm md:p-4 ${
              currentTab === "product"
                ? "  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
          >
            {currentCopy.product}
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentTab("description")}
            className={`active inline-block rounded-t-lg  p-2 py-4 text-sm md:p-4 ${
              currentTab === "description"
                ? "  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
            aria-current="page"
          >
            {currentCopy.description}
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentTab("variants")}
            className={`active inline-block rounded-t-lg  p-2 py-4 text-sm md:p-4 ${
              currentTab === "variants"
                ? "  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
          >
            {currentCopy.variants}
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentTab("images")}
            className={`active inline-block rounded-t-lg  p-2 py-4 text-sm md:p-4 ${
              currentTab === "images"
                ? "  font-bold text-blue-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
          >
            {currentCopy.images}
          </button>
        </li>
        <li className="my-auto ml-auto mr-4 hidden space-x-4 md:flex">
          {isLoading ? (
            <button className="bold my-auto  rounded-md bg-white py-3 px-8 text-sm  font-bold text-red-500 ring ring-gray-200 ">
              Loading...
              <Spinner className=" ml-2 inline h-4 w-4 animate-spin text-white" />
            </button>
          ) : (
            <button
              onClick={() => deleteProduct({ pid: pid })}
              className="bold my-auto  rounded-md bg-white py-3 px-8 text-sm  font-bold text-red-500 ring ring-gray-200 "
            >
              {currentCopy.removeProduct}
            </button>
          )}
          {loadingFinalization ? (
            <button className="bold my-auto  rounded-md bg-white py-3 px-8 text-sm  font-bold text-gray-800 ring ring-gray-200 ">
              Loading...
              <Spinner className=" ml-2 inline h-4 w-4 animate-spin text-white" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (productNameRef.current?.value) {
                  finalizeListing({
                    description: productDescription,
                    imageSet: productImages,
                    name: productNameRef.current.value,
                    pid: pid,
                    variants: productVariants.map((variant) => {
                      return {
                        height: variant.height,
                        image: variant.image,
                        name: variant.name,
                        price: variant.price,
                        vid: variant.vid,
                        width: variant.width,
                      };
                    }),
                  });
                }
              }}
              className="my-auto rounded-md bg-emerald-500 py-3 px-8 text-sm font-bold text-white "
            >
              {currentCopy.importToStore}
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default TabMenu;
