import { Category, ProductVariant } from "@prisma/client";
import { useRef, useState } from "react";
import { ProductWithTags } from "../../../types";
import ProductData from "./tabs/ProductData";
import ProductDescription from "./tabs/ProductDescription";
import ProductImages from "./tabs/ProductImages";
import ProductVariants from "./tabs/ProductVariants";
import TabMenu from "./tabs/TabMenu";

export type Tabs = "product" | "description" | "variants" | "images";

const ProductTab = ({ product }: { product: ProductWithTags }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [variantPrices, setVariantPrices] = useState<number[]>(
    product.variants.map((variant) => {
      return variant.price;
    })
  );

  const productNameref = useRef<HTMLInputElement>(null);
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState(
    product.imageSet.map((_) => {
      return true;
    })
  );

  const [currentTab, setCurrentTab] = useState<Tabs>("product");
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
        productNameRef={productNameref}
        productDescription={productDescription}
        productCategory={selectedCategory}
        productImages={product.imageSet.filter((image, idx) => {
          if (productImages[idx]) {
            return image;
          }
        })}
        pid={product.pid}
      />
      {currentTab === "product" ? (
        <ProductData
          productNameRef={productNameref}
          product={product}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
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
    </>
  );
};

export default ProductTab;
