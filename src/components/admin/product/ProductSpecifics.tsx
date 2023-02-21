import { CheckIcon } from "@heroicons/react/24/solid";
import { type Dispatch, useState } from "react";
import type { Language } from "../../../types";
import { api } from "../../../utils/api";
import Dashboard from "../Dashboard";
import ProductSpecificImages from "./ProductSpecificImages";
import { LoadingProductList } from "./ProductSpecificWrapper";
import ShipmentTable from "./ShipmentTable";
import VariantsTable from "./VariantsTable";
import DashboardPageWrapper from "../layouts/DashboardPageWrapper";
import Spinner from "../../Spinner";
const copy = {
  en: {
    shipping: "Shipping",
    variants: "Variants",
  },
  it: {
    shipping: "Spedizione",
    variants: "Varianti",
  },
};
type SubMenu = "shipping" | "variants";
type ShipmentData = {
  courier: string;
  est: string;
  price: number;
};

const ProductSpecifics = ({ pid }: { pid: string }) => {
  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenu>("shipping");
  const utils = api.useContext();

  const [economyShipping, setEconomyShipping] = useState<
    undefined | ShipmentData
  >(undefined);

  const [regularShipping, setRegularShipping] = useState<
    undefined | ShipmentData
  >(undefined);
  const {
    mutate: registerNewProduct,
    isSuccess,
    isLoading,
  } = api.products.registerProduct.useMutation({
    onSuccess: () => {
      utils.products.invalidate().catch((error) => console.error(error));
    },
  });

  const { data: productData } = api.cjApi.requestProductByID.useQuery({
    pid: pid,
  });

  if (!productData) {
    return <LoadingProductList />;
  }

  if ((productData && !productData.data) || productData.data === undefined) {
    return (
      <DashboardPageWrapper>
        <div>Unable to find Product Data</div>
      </DashboardPageWrapper>
    );
  }

  const product = productData.data;

  return (
    <DashboardPageWrapper>
      <div className="py-12 md:px-24">
        <div className="w-full rounded-xl bg-white py-8 px-6 shadow-lg md:px-24">
          {/* Outermost flex */}
          <div className="flex flex-col items-start md:flex-row md:space-x-24">
            {/* left side */}
            <div className="flex flex-col justify-center space-y-8 ">
              <ProductSpecificImages
                imageSet={product.productImageSet}
                alt={product.description}
              />
            </div>
            {/* right side */}
            <div className="mt-16 w-full md:mt-0">
              <h2 className="text-2xl font-bold capitalize text-gray-800">
                {product.entryNameEn}
              </h2>
              <p className="py-3 text-sm">
                Supplier
                <span className="text-sm font-semibold text-gray-800">
                  Unknown
                </span>
              </p>
              <p className="py-4 text-sm text-gray-600">
                {product.productNameEn}
              </p>
              <a
                className="text-sm text-blue-400 underline underline-offset-2"
                href={`https://cjdropshipping.com/product/-p-${product.pid}.html`}
                target={"_blank"}
                rel="noreferrer"
              >
                View more
              </a>
              <div className="mt-12 md:mt-24">
                <p className="text-sm text-gray-700">Product cost</p>
                <p className="py-2 text-2xl font-semibold text-gray-800">
                  ${product.sellPrice}
                </p>
                <div className="mt-16 w-full md:mt-24">
                  <div className="flex w-full justify-center space-x-12 bg-gray-100 px-3 py-4 text-lg font-bold md:justify-start md:px-6">
                    <p
                      className={`cursor-pointer ${
                        currentSubMenu === "shipping"
                          ? "text-gray-800"
                          : "text-gray-500"
                      }`}
                      onClick={() => setCurrentSubMenu("shipping")}
                    >
                      Shipping
                    </p>
                    <p
                      className={`cursor-pointer ${
                        currentSubMenu === "variants"
                          ? "text-gray-800"
                          : "text-gray-500"
                      }`}
                      onClick={() => setCurrentSubMenu("variants")}
                    >
                      Variants
                    </p>
                  </div>
                  {currentSubMenu === "shipping" ? (
                    <ShipmentTable
                      vid={product.variants[0].vid}
                      setRegularShippingData={setRegularShipping}
                      setEconomyShippingData={setEconomyShipping}
                    />
                  ) : (
                    <VariantsTable variants={product.variants} />
                  )}
                  <div className="mt-12 flex w-full flex-col items-center justify-start space-y-4 px-3 md:flex-row md:space-y-0 md:space-x-4 md:px-12">
                    {isLoading ? (
                      <button className="w-full rounded-md bg-emerald-400 py-4 text-sm font-bold text-white md:w-1/2 md:px-5 ">
                        <Spinner className="mr-2 inline h-4 w-4 animate-spin text-gray-200 " />
                        loading
                      </button>
                    ) : isSuccess ? (
                      <button className="w-full rounded-md  bg-emerald-400 py-4 text-sm font-bold text-white md:w-1/2 md:px-5 ">
                        <CheckIcon className=" mr-2 inline h-4 w-4 text-white" />
                        Successful
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (economyShipping) {
                            registerNewProduct({
                              defaultThumbnail: product.productImageSet[0],
                              categoryId: product.categoryId,
                              categoryName: product.categoryName,
                              description: product.productNameEn,
                              name: product.entryNameEn,
                              imageSet: product.productImageSet,
                              pid: product.pid,
                              variants: product.variants.map((variant) => {
                                return {
                                  image: variant.variantImage,
                                  price: variant.variantSellPrice,
                                  vid: variant.vid,
                                  name:
                                    variant.variantNameEn ?? product.entryName,
                                  height: variant.variantHeight,
                                  width: variant.variantWidth,
                                };
                              }),
                              shipments: regularShipping
                                ? [regularShipping, economyShipping]
                                : [economyShipping],
                            });
                          }
                        }}
                        className="w-full rounded-md bg-emerald-400 py-4 text-sm font-bold text-white md:w-1/2 md:px-5"
                      >
                        Add to import list
                      </button>
                    )}
                    <button className="w-full rounded-md bg-white  py-3 text-sm font-bold text-gray-800 ring ring-gray-200 md:w-1/2 md:px-5">
                      Coming soon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
};

export default ProductSpecifics;
