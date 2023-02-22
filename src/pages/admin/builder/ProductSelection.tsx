import { type Dispatch, type SetStateAction, useState } from "react";
import { api } from "../../../utils/api";
import type { Product, ProductVariant } from "@prisma/client";
import { CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

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

const ProductSelection = ({
  setSectionThumbnail,
  setSelectedProducts,
  sectionThumbnail,
}: {
  setSectionThumbnail: Dispatch<SetStateAction<string>>;
  setSelectedProducts: Dispatch<SetStateAction<string[]>>;
  sectionThumbnail: string;
}) => {
  const { data: storeProducts } = api.products.getAllStoreProducts.useQuery();

  return (
    <div className="flex h-96 w-full flex-col gap-y-4 gap-x-2 overflow-y-auto px-4 lg:flex-row  lg:flex-wrap">
      {storeProducts &&
        storeProducts.map((prod) => {
          return (
            <SelectableProduct
              sectionThumbnail={sectionThumbnail}
              setSectionThumbnail={setSectionThumbnail}
              key={prod.pid}
              product={prod}
              setSelectedProducts={setSelectedProducts}
            />
          );
        })}
    </div>
  );
};

const SelectableProduct = ({
  product,
  setSelectedProducts,
  sectionThumbnail,
  setSectionThumbnail,
}: {
  product: Product & {
    variants: ProductVariant[];
  };
  setSelectedProducts: Dispatch<SetStateAction<string[]>>;

  sectionThumbnail: string;
  setSectionThumbnail: Dispatch<SetStateAction<string>>;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onClick={() => {
        setSelectedProducts((prev) => [...prev, product.pid]);
        if (sectionThumbnail === product.defaultThumbnail) {
          setSectionThumbnail("");
          setIsActive(false);
        } else if (isActive) {
          setSectionThumbnail(product.defaultThumbnail);
        } else {
          setIsActive((prev) => !prev);
        }
      }}
      className={` relative z-10 flex w-full cursor-pointer select-none items-center justify-between rounded-md border p-3 shadow-md lg:w-96 ${
        isActive ? "bg-sky-600 text-white " : "bg-white text-gray-900"
      }`}
    >
      <div className="flex w-full items-center space-x-4 ">
        <div className="relative h-24 w-24">
          <Image
            fill
            alt={product.name}
            src={product.defaultThumbnail}
            className=" rounded-md object-cover"
          />
        </div>

        <div className="relative flex flex-col text-sm">
          <p
            className={`font-medium ${
              !isActive ? "text-gray-700" : "text-white"
            }`}
          >
            {product.name}
          </p>
          <p
            className={`font-semibold ${
              !isActive ? "text-gray-800" : "text-white"
            }`}
          >
            {evaluatePriceRange(
              product.variants.map((variant) => variant.price)
            )}
          </p>
        </div>
      </div>
      {(isActive || product.defaultThumbnail === sectionThumbnail) && (
        <button
          onClick={() => {
            setIsActive(true);
            setSectionThumbnail(product.pid);
          }}
          className={`relative z-30 flex items-center justify-center rounded-full ${
            sectionThumbnail === product.defaultThumbnail
              ? "bg-orange-400"
              : "bg-sky-400"
          } p-1`}
        >
          <CheckIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ProductSelection;
