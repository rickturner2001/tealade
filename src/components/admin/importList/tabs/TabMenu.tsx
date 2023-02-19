import { XMarkIcon } from "@heroicons/react/24/solid";
import { TRPCClientError } from "@trpc/client";
import { type Dispatch, type SetStateAction, useContext } from "react";
import { api } from "../../../../utils/api";
import LanguageContext from "../../../context/LanugageContext";
import Spinner from "../../../Spinner";
import type { Tabs } from "../ProductTab";

type VariantListing = {
  height: number;
  image: string;
  name: string;
  price: number;
  vid: string;
  width: number;
};

const TabMenu = ({
  productNameValue,
  productDescription,
  productImages,
  sectionLabel,
  productVariants,
  setCurrentTab,
  currentTab,
  pid,
}: {
  productNameValue: string;
  productDescription: string;
  productImages: string[];
  sectionLabel: { id: string; label: string };
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

  const {
    mutate: finalizeListing,
    isLoading: loadingFinalization,
    isError,
    error,
  } = api.products.finalizeProductListing.useMutation({
    onSuccess: () => {
      utils.products.invalidate().catch((e) => console.error(e));
    },
  });

  const currentCopy = language === "english" ? copy.en : copy.it;

  console.log(error?.data);

  console.log();

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
            <button className="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 ">
              Loading...
              <Spinner className=" ml-2 inline h-4 w-4 animate-spin text-white" />
            </button>
          ) : (
            <button
              onClick={() => deleteProduct({ pid: pid })}
              className="mr-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 "
            >
              {currentCopy.removeProduct}
            </button>
          )}
          {loadingFinalization ? (
            <button className="mr-2 mb-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 ">
              Loading...
              <Spinner className=" ml-2 inline h-4 w-4 animate-spin text-white" />
            </button>
          ) : (
            <button
              className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 "
              onClick={() => {
                finalizeListing({
                  description: productDescription,
                  imageSet: productImages,
                  name: productNameValue,
                  pid: pid,
                  sectionId: sectionLabel.id,
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
              }}
            >
              {currentCopy.importToStore}
            </button>
          )}
        </li>
      </ul>
      {isError && (
        <div className="flex items-center justify-between bg-red-50 px-8 py-4 text-sm font-semibold text-red-800">
          <p>
            {error instanceof TRPCClientError &&
              "Only admins can register new products"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TabMenu;
