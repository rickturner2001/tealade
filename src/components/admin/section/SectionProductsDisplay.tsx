import { useContext, useState } from "react";
import sectionEditContext from "../../context/sectionEditContext";
import type {
  ProductWithDiscount,
  SectionDataWithProducts,
} from "../../../types";
import { TrashIcon } from "@heroicons/react/24/outline";
import ProductImages from "../importList/tabs/ProductImages";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { api } from "../../../utils/api";
import { useIsMutating } from "@tanstack/react-query";
import Spinner from "../../Spinner";

const evaluatePriceRange = (variants: number[]) => {
  if (variants.length === 1) {
    return variants[0] as number;
  }
  const first = variants[0] as number;
  const last = variants[variants.length - 1] as number;

  if (first === last) {
    return first;
  }
  return `${first}-${last}`;
};

function getProductDiscount(
  price: string | number,
  discount: number
): string | number {
  if (typeof price === "number") {
    return ((price * (100 - discount)) / 100).toFixed(2);
  } else {
    const [startPrice, endPrice] = price.split("-");
    const discountedStartPrice = (
      (parseInt(startPrice as string) * (100 - discount)) /
      100
    ).toFixed(2);
    const discountedEndPrice = (
      (parseInt(endPrice as string) * (100 - discount)) /
      100
    ).toFixed(2);
    return `${discountedStartPrice}-${discountedEndPrice}`;
  }
}

const SectionProductsDisplay = ({
  sectionData,
}: {
  sectionData: SectionDataWithProducts;
}) => {
  return (
    <div className="relative mx-auto max-w-2xl rounded-lg bg-white py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Section products
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {sectionData.products.map((product) => (
          <SectionProduct
            key={product.pid}
            product={product}
            sid={sectionData.id}
          />
        ))}
      </div>
    </div>
  );
};

const SectionProduct = ({
  product,
  sid,
}: {
  product: ProductWithDiscount;
  sid: string;
}) => {
  const { isEditingThumbnail, setIsEditingThumbnail, setNewThumbnail } =
    useContext(sectionEditContext);

  const utils = api.useContext();

  const { mutate: removeItemsMutation, isLoading: loadingItemsRemoval } =
    api.sections.removeItemsFromSection.useMutation({
      onSuccess: async () => {
        await utils.sections.invalidate();
      },
    });
  const productPrice = evaluatePriceRange(
    product.variants.map((variant) => variant.price)
  );
  return (
    <>
      <div
        onClick={() => {
          if (isEditingThumbnail) {
            setNewThumbnail(product.defaultThumbnail);
            setIsEditingThumbnail(false);
          }
        }}
        key={product.pid}
        className="group relative"
      >
        <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
          <img
            src={product.defaultThumbnail}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between ">
          <div className="w-full">
            <div className="flex w-full justify-between">
              <h3 className="text-sm text-gray-700">
                <p>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </p>
              </h3>

              <p className="text-sm font-medium text-gray-900">
                {product.discount ? (
                  <span className="inline-flex ">
                    $<span className="mr-1 line-through">{productPrice}</span>
                    <span>
                      {getProductDiscount(productPrice, product.discount.value)}
                    </span>
                  </span>
                ) : (
                  productPrice
                )}
              </p>
            </div>
            <div className="mt-2 flex w-full gap-x-2">
              {product.discount && (
                <span className=" block  w-max rounded-lg  bg-purple-100 p-2  text-sm font-medium text-purple-900">
                  {product.discount?.value}%
                </span>
              )}
              {loadingItemsRemoval ? (
                <button className=" relative z-30 inline-flex  w-full items-center justify-center rounded-lg bg-red-100 p-2 text-center text-red-900 hover:bg-red-200 focus:ring-2 focus:ring-red-500">
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  loading
                </button>
              ) : (
                <button
                  onClick={() => removeItemsMutation({ pid: product.pid, sid })}
                  className=" relative  z-30 inline-flex w-full items-center justify-center rounded-lg bg-red-100 p-2 text-center text-red-900 hover:bg-red-200 focus:ring-4 focus:ring-red-300"
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionProductsDisplay;
