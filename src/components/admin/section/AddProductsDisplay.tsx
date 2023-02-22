import { useContext, useState } from "react";
import Spinner from "../../Spinner";
import { api } from "../../../utils/api";
import sectionEditContext from "../../context/sectionEditContext";
import AddProductsAlert from "./alerts/AddProductsAlert";
import type { ProductWithDiscount } from "../../../types";
import {
  evaluatePriceRange,
  getProductDiscount,
} from "../../../pages/admin/section/[sid]";
import Image from "next/image";

const AddProductsDisplay = ({ existingPids }: { existingPids: string[] }) => {
  const { data: storeProducts } = api.products.getAllStoreProducts.useQuery();

  if (!storeProducts) {
    return (
      <div className="flex h-[89vh] w-full flex-col items-center justify-center">
        <Spinner className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const filteredProducts = storeProducts.filter(
    (prod) => !existingPids.includes(prod.pid)
  );

  return (
    <div className="mx-auto mt-12 flex h-full w-full max-w-7xl flex-col rounded-lg ">
      <AddProductsAlert />
      <div className="rounded-lg bg-white px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products list
        </h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 pt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => {
            return <ListedProduct product={product} key={product.pid} />;
          })}
        </div>
      </div>
    </div>
  );
};

const ListedProduct = ({ product }: { product: ProductWithDiscount }) => {
  const [isActive, setIsActive] = useState(false);
  const { setNewProducts, newProducts } = useContext(sectionEditContext);

  const productPrice = evaluatePriceRange(
    product.variants.map((variant) => variant.price)
  );

  return (
    <div
      onClick={() => {
        if (newProducts.includes(product.pid)) {
          setNewProducts((prev) => prev.filter((pid) => pid !== product.pid));
        } else {
          setNewProducts((prev) => [...prev, product.pid]);
        }
        setIsActive((prev) => !prev);
      }}
      key={product.pid}
      className={`group relative rounded-lg p-1 ring-4 ring-transparent ${
        isActive ? "ring-blue-300" : ""
      }`}
    >
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <Image
          fill={true}
          src={product.defaultThumbnail}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <p>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </p>
          </h3>
        </div>
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
    </div>
  );
};

export default AddProductsDisplay;
