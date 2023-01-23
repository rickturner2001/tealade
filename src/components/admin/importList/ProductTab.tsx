import { Category } from "@prisma/client";
import { useState } from "react";
import { ProductWithTags } from "../../../types";
import ProductData from "./tabs/ProductData";
import ProductDescription from "./tabs/ProductDescription";
import ProductVariants from "./tabs/ProductVariants";
import TabMenu from "./tabs/TabMenu";

export type Tabs = "product" | "description" | "variants" | "images";

const ProductTab = ({ product }: { product: ProductWithTags }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [variantPrices, setVariantPrices] = useState<number[]>(
    product.variants.map((variant) => variant.price)
  );

  const [productDescription, setProductDescription] = useState("");

  const [currentTab, setCurrentTab] = useState<Tabs>("product");

  return (
    <>
      <TabMenu setCurrentTab={setCurrentTab} currentTab={currentTab} />
      {currentTab === "product" ? (
        <ProductData
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
        <></>
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
