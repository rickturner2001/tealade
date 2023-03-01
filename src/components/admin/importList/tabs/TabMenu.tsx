import { TRPCClientError } from "@trpc/client";
import { type Dispatch, type SetStateAction, useContext } from "react";
import { api } from "../../../../utils/api";
import LanguageContext from "../../../context/LanugageContext";
import Spinner from "../../../Spinner";
import type { Tabs } from "../ProductTab";
import { ButtonPrimary, ButtonSupportPrimary } from "../../buttons/Buttons";

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
      <ul className=" flex flex-wrap py-2 px-2 lg:py-4">
        <li>
          <button
            onClick={() => setCurrentTab("product")}
            className={`active inline-block rounded-t-lg  p-2 py-4 text-sm lg:p-4 ${
              currentTab === "product"
                ? "  font-bold text-support-primary-600 "
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
                ? "  font-bold text-support-primary-600 "
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
                ? "  font-bold text-support-primary-600 "
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
                ? "  font-bold text-support-primary-600 "
                : "border-transparent hover:border-gray-300 hover:text-gray-600"
            } `}
          >
            {currentCopy.images}
          </button>
        </li>
        <li className="my-auto ml-auto mr-4 hidden space-x-4 xl:flex">
          <ButtonSupportPrimary
            label="Remove product"
            handler={() => deleteProduct({ pid: pid })}
          >
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : undefined}
          </ButtonSupportPrimary>
          <ButtonPrimary
            handler={() => {
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
            label={loadingFinalization ? "loading" : "Import to store"}
          >
            {loadingFinalization ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : undefined}
          </ButtonPrimary>
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
