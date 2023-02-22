import { useContext, useState } from "react";
import type { ProductWithTags } from "../../../types";
import { api } from "../../../utils/api";
import LanguageContext from "../../context/LanugageContext";
import Spinner from "../../Spinner";
import ProductData from "./tabs/ProductData";
import ProductDescription from "./tabs/ProductDescription";
import ProductImages from "./tabs/ProductImages";
import ProductVariants from "./tabs/ProductVariants";
import TabMenu from "./tabs/TabMenu";

export type Tabs = "product" | "description" | "variants" | "images";

const ProductTab = ({ product }: { product: ProductWithTags }) => {
  const [variantPrices, setVariantPrices] = useState<number[]>(
    product.variants.map((variant) => {
      return variant.price;
    })
  );

  const [productNameValue, setProductNameValue] = useState(product.name);
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState(
    product.imageSet.map(() => {
      return true;
    })
  );

  const utils = api.useContext();

  const { language } = useContext(LanguageContext);

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

  const [currentTab, setCurrentTab] = useState<Tabs>("product");
  const [selectedSectionLabel, setSelectedSectionLabel] = useState({
    label: "",
    id: "",
  });

  return (
    <>
      <TabMenu
        productVariants={product.variants.map((variant) => {
          return {
            height: variant.height,
            image: variant.thumbnail,
            name: variant.variantName,
            price: variant.price,
            vid: variant.vid,
            width: variant.width,
          };
        })}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        productNameValue={productNameValue}
        productDescription={productDescription}
        productImages={product.imageSet.filter((image, idx) => {
          if (productImages[idx]) {
            return image;
          }
        })}
        pid={product.pid}
        sectionLabel={selectedSectionLabel}
      />
      {currentTab === "product" ? (
        <ProductData
          productNameValue={productNameValue}
          setProductNameValue={setProductNameValue}
          product={product}
          selectedSectionLabel={selectedSectionLabel}
          setSelectedSectionLabel={setSelectedSectionLabel}
        />
      ) : currentTab === "description" ? (
        <ProductDescription
          productDescription={productDescription}
          setProductDescription={setProductDescription}
          product={product}
        />
      ) : currentTab === "images" ? (
        <ProductImages
          product={product}
          imagesStates={productImages}
          setImagesStates={setProductImages}
        />
      ) : currentTab === "variants" ? (
        <ProductVariants
          variantPrices={variantPrices}
          setVariantPrices={setVariantPrices}
          product={product}
        />
      ) : (
        <></>
      )}

      <div className="mt-4 flex w-full flex-col-reverse gap-y-2 px-4 pb-6 md:hidden">
        {isLoading ? (
          <button className="bold my-auto w-full   rounded-md bg-white py-3 px-8 text-sm  font-bold text-red-500 ring ring-gray-200 ">
            Loading...
            <Spinner className=" ml-2 inline h-4 w-4 animate-spin text-white" />
          </button>
        ) : (
          <button
            onClick={() => deleteProduct({ pid: product.pid })}
            className="bold my-auto  w-full rounded-md  bg-red-100 py-3 px-8 text-sm font-medium text-red-900 hover:bg-red-200 "
          >
            {language === "english" ? "Remove product" : "Rimuovi prodotto"}
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
              const productVariants = product.variants.map((variant) => {
                return {
                  height: variant.height,
                  image: variant.thumbnail,
                  name: variant.variantName,
                  price: variant.price,
                  vid: variant.vid,
                  width: variant.width,
                };
              });

              finalizeListing({
                description: productDescription,
                imageSet: product.imageSet.filter((src, idx) => {
                  if (productImages[idx]) {
                    return src;
                  }
                }),
                name: productNameValue,
                pid: product.pid,
                variants: productVariants,
                sectionId: selectedSectionLabel.id,
              });
            }}
            className="my-auto rounded-md bg-emerald-100 py-3 px-8 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:ring-4 focus:ring-emerald-300  "
          >
            {language === "english" ? "Import to store" : "Importa sul negozio"}
          </button>
        )}
      </div>
    </>
  );
};

export default ProductTab;
