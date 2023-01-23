import { useRouter } from "next/router";
import Dashboard from "../../../components/admin/Dashboard";
import { api } from "../../../utils/api";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  CjProductVariant,
  CJShippingResponse,
  Language,
  NonEmptyArray,
} from "../../../types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

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

const ProductSpecificsWrapper = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [language, setLanguage] = useState<Language>("english");

  if (!pid) {
    return (
      <Dashboard
        language={language}
        setLanguage={setLanguage}
        title={
          language === "english" ? "Product details" : "Dettagli del prodotto"
        }
      >
        <div className="flex h-full w-full items-center justify-center">
          loading...
        </div>
      </Dashboard>
    );
  }
  return (
    <ProductSpecifics
      pid={pid as string}
      language={language}
      setLanguage={setLanguage}
    />
  );
};

const ProductSpecifics = ({
  pid,
  setLanguage,
  language,
}: {
  pid: string;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}) => {
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
    return (
      <Dashboard
        language={language}
        setLanguage={setLanguage}
        title={
          language === "english" ? "Product details" : "Dettagli del prodotto"
        }
      >
        <div className="flex h-full w-full items-center justify-center">
          loading...
        </div>
      </Dashboard>
    );
  }

  if ((productData && !productData.data) || productData.data === undefined) {
    return (
      <Dashboard
        language={language}
        setLanguage={setLanguage}
        title={
          language === "english" ? "Product details" : "Dettagli del prodotto"
        }
      >
        <div>Unable to find Product Data</div>
      </Dashboard>
    );
  }

  const product = productData.data;
  const currentCopy = language === "english" ? copy.en : copy.it;

  return (
    <Dashboard
      language={language}
      setLanguage={setLanguage}
      title={
        language === "english" ? "Product details" : "Dettagli del prodotto"
      }
    >
      <div className="py-12 px-24">
        <div className="w-full rounded-xl bg-white py-8 px-24 shadow-lg">
          {/* Outermost flex */}
          <div className="flex items-start space-x-24">
            {/* left side */}
            <div className="flex flex-col justify-center space-y-8 ">
              <ProductSpecificImages
                imageSet={product.productImageSet}
                alt={product.description}
              />
            </div>
            {/* right side */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold capitalize text-gray-800">
                {product.entryNameEn}
              </h2>
              <p className="py-3 text-sm">
                {language === "english" ? "Supplier:" : "Rivenditore:"}{" "}
                <span className="text-sm font-semibold text-gray-800">
                  {product.supplierName ?? language === "english"
                    ? "Unknown"
                    : "Sconosciuto"}
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
                {language === "english" ? "View more" : "Scopri altro"}
              </a>
              <div className="mt-24">
                <p className="text-sm text-gray-700">
                  {language === "english"
                    ? "Product cost"
                    : "Costo del prodotto"}
                </p>
                <p className="py-2 text-2xl font-semibold text-gray-800">
                  ${product.sellPrice}
                </p>
                <div className="mt-24 w-full">
                  <div className="flex w-full space-x-12 bg-gray-100 px-6 py-4 text-lg font-bold">
                    <p
                      className={`cursor-pointer ${
                        currentSubMenu === "shipping"
                          ? "text-gray-800"
                          : "text-gray-500"
                      }`}
                      onClick={() => setCurrentSubMenu("shipping")}
                    >
                      {currentCopy.shipping}
                    </p>
                    <p
                      className={`cursor-pointer ${
                        currentSubMenu === "variants"
                          ? "text-gray-800"
                          : "text-gray-500"
                      }`}
                      onClick={() => setCurrentSubMenu("variants")}
                    >
                      {currentCopy.variants}
                    </p>
                  </div>
                  {currentSubMenu === "shipping" ? (
                    <ShipmentTable
                      vid={product.variants[0].vid}
                      language={language}
                      setRegularShippingData={setRegularShipping}
                      setEconomyShippingData={setEconomyShipping}
                    />
                  ) : (
                    <VariantsTable
                      language={language}
                      variants={product.variants}
                    />
                  )}
                  <div className="w-1/2items-center mt-12 flex justify-start space-x-4 px-12">
                    {isLoading ? (
                      <button className="w-1/2 rounded-md bg-emerald-400 py-4 px-5 text-sm font-bold text-white ">
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="mr-2 inline h-4 w-4 animate-spin text-gray-200 "
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          />
                        </svg>
                        {language === "english"
                          ? "Loading..."
                          : "Caricamento..."}
                      </button>
                    ) : isSuccess ? (
                      <button className="w-1/2 rounded-md bg-emerald-400 py-4 px-5 text-sm font-bold text-white ">
                        <CheckIcon className=" mr-2 inline h-4 w-4 text-white" />
                        {language === "english" ? "Successful" : "Successo"}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (economyShipping) {
                            registerNewProduct({
                              defaultThumbnail: product.productImageSet[0],
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
                        className="w-1/2 rounded-md bg-emerald-400 py-4 px-5 text-sm font-bold text-white"
                      >
                        {language === "english"
                          ? "Add to import list"
                          : "Aggiungi alla lista degli importi"}
                      </button>
                    )}
                    <button className="w-1/2 rounded-md  bg-white py-3 px-5 text-sm font-bold text-gray-800 ring ring-gray-200">
                      {language === "english" ? "Coming soon" : "In arrivo"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

const shipmentCopy = {
  en: {
    europe: "Europe",
    est: "Estimated shipping time",
    cost: "Cost",

    selectEconomy: "Select economy",
    selectRegular: "Select regular",
  },
  it: {
    europe: "Europa",
    est: "Tempo di spedizione stimato",
    cost: "Costo",
    selectEconomy: "Assegna economico",
    selectRegular: "Assegna regolare",
  },
};

type SelectionType = "economy" | "regular";

const ShipmentTable = ({
  language,
  setEconomyShippingData,
  setRegularShippingData,
  vid,
}: {
  setEconomyShippingData: Dispatch<SetStateAction<ShipmentData | undefined>>;
  setRegularShippingData: Dispatch<SetStateAction<ShipmentData | undefined>>;
  language: Language;
  vid: string;
}) => {
  const [shipmentSelection, setShpmentSelection] =
    useState<SelectionType>("economy");

  const [economyShipping, setEconomyShipping] = useState(0);
  const [regularShipping, setRegularShipping] = useState(0);

  const { data: shipmentData } = api.cjApi.requestShipmentByVid.useQuery({
    vid: vid,
  });

  useEffect(() => {
    if (
      !economyShipping &&
      !regularShipping &&
      shipmentData &&
      shipmentData.data
    ) {
      const economy = shipmentData.data[0];
      if (economy) {
        setEconomyShippingData({
          courier: economy.logisticName,
          est: economy.logisticAging,
          price: economy.logisticPrice,
        });
        setEconomyShipping(0);
      }

      const regular = shipmentData.data[1];
      if (regular) {
        setRegularShippingData({
          courier: regular.logisticName,
          est: regular.logisticAging,
          price: regular.logisticPrice,
        });
        setRegularShipping(1);
      }
    }
  }, [shipmentData]);

  if (!shipmentData || !shipmentData.data) {
    return <div>Loading...</div>;
  }

  const currentCopy =
    language === "english" ? shipmentCopy.en : shipmentCopy.it;

  return (
    <div className="mt-8 flex w-full flex-col px-12">
      <div className="mb-6 flex w-full justify-end space-x-4">
        <button
          onClick={() => setShpmentSelection("economy")}
          className={`rounded-lg border border-gray-800 ${
            shipmentSelection === "economy"
              ? "bg-gray-800 text-white"
              : "bg-transparent text-gray-800"
          } py-2 px-4 text-sm font-bold  hover:bg-gray-800 hover:text-white`}
        >
          {currentCopy.selectEconomy}
        </button>
        {shipmentData.data.length > 1 && (
          <button
            onClick={() => setShpmentSelection("regular")}
            className={`rounded-lg border ${
              shipmentSelection === "regular"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-blue-500"
            } border-blue-500 py-2 px-4 text-sm font-bold  hover:bg-blue-500 hover:text-white`}
          >
            {currentCopy.selectRegular}
          </button>
        )}
      </div>
      <table className="`w-full">
        <thead className="border-b py-2 text-left">
          <tr>
            <th className="py-2"></th>
            <th className="py-2 text-sm font-bold text-gray-800">
              {currentCopy.europe}
            </th>
            <th className="py-2  text-sm font-bold text-gray-800">
              {currentCopy.est}
            </th>
            <th className="py-2 text-sm font-bold text-gray-800">
              {currentCopy.cost}
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {shipmentData.data.map((ship, idx) => {
            return (
              <tr className="py-2" key={idx}>
                <td className="py-2">
                  {shipmentSelection === "economy" ? (
                    <input
                      onChange={() => {
                        setEconomyShipping(idx);
                        setEconomyShippingData({
                          price: ship.logisticPrice,
                          courier: ship.logisticName,
                          est: ship.logisticAging,
                        });
                      }}
                      id="disabled-radio-1"
                      name={"economy"}
                      type="radio"
                      checked={idx === economyShipping}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
                    />
                  ) : (
                    <input
                      onChange={() => {
                        setRegularShipping(idx);
                        setRegularShippingData({
                          price: ship.logisticPrice,
                          courier: ship.logisticName,
                          est: ship.logisticAging,
                        });
                      }}
                      id="disabled-radio-1"
                      name={"regular"}
                      type="radio"
                      checked={idx === regularShipping}
                      className="h-4 w-4 border-gray-300 bg-gray-800 text-gray-800 focus:ring-gray-800 "
                    />
                  )}
                </td>
                <td className="py-2">{ship.logisticName}</td>
                <td className="py-2">{ship.logisticAging}</td>
                <td className="py-2">${ship.logisticPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const variantsCopy = {
  en: {
    name: "Name",
    height: "Height",
    width: "Width",
    cost: "Cost",
  },
  it: {
    name: "Nome",
    height: "Altezza",
    width: "Larghezza",
    size: "Taglia",
    cost: "Costo",
  },
};

const VariantsTable = ({
  language,
  variants,
}: {
  language: Language;
  variants: CjProductVariant[];
}) => {
  const currentCopy =
    language === "english" ? variantsCopy.en : variantsCopy.it;

  return (
    <div className="mt-8 flex w-full flex-col px-12">
      <table className="`w-full">
        <thead className="border-b py-2 text-left">
          <th className="py-2"></th>
          <th className="py-2  text-sm font-bold text-gray-800">
            {currentCopy.name}
          </th>
          <th className="py-2 text-sm font-bold text-gray-800">
            {currentCopy.height}
          </th>
          <th className="py-2 text-sm font-bold text-gray-800">
            {currentCopy.width}
          </th>
          <th className="py-2 text-sm font-bold text-gray-800">
            {currentCopy.cost}
          </th>
        </thead>
        <tbody className="text-sm">
          {variants.map((variant, idx) => {
            return (
              <tr className="py-2" key={idx}>
                <td className="py-2">
                  <img
                    className="h-12  w-12 object-contain"
                    src={variant.variantImage}
                  />
                </td>
                <td className="truncate text-ellipsis py-2 text-xs">
                  {variant.variantNameEn}
                </td>
                <td className="py-2">{variant.variantHeight} cm</td>
                <td className="py-2">{variant.variantWidth} cm</td>

                <td className="text-bold py-2">${variant.variantSellPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ProductSpecificImages = ({
  imageSet,
  alt,
}: {
  imageSet: NonEmptyArray<string>;
  alt: string;
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <>
      <div className="">
        <img
          src={imageSet[currentImage]}
          alt={alt}
          className="h-96 w-96 object-cover"
        />
      </div>
      <div className="flex items-center justify-center space-x-4">
        <ChevronLeftIcon
          className="h-5 w-5 text-gray-600"
          onClick={() => {
            if (currentImage === 0) {
              setCurrentImage(imageSet.length - 1);
            } else {
              setCurrentImage((prev) => prev - 1);
            }
          }}
        />
        <div>
          {imageSet.length >= 3 ? (
            currentImage === 0 ? (
              <div className="flex w-full space-x-2">
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>
                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[imageSet.length - 1]}
                  />
                </div>
                <div className="relatve rounded-xl border-gray-500">
                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[currentImage]}
                  />
                </div>
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>

                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[currentImage + 1]}
                  />
                </div>
              </div>
            ) : currentImage === imageSet.length - 1 ? (
              <div className="flex w-full space-x-2">
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>
                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[currentImage - 1]}
                  />
                </div>
                <div className="relative rounded-xl border-gray-500">
                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[currentImage]}
                  />
                </div>
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>
                  <img className="h-16 w-16 object-contain" src={imageSet[0]} />
                </div>
              </div>
            ) : (
              <div className="flex w-full space-x-2">
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>
                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[currentImage - 1]}
                  />
                </div>
                <div className="relative rounded-xl border border-gray-500">
                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[currentImage]}
                  />
                </div>

                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>
                  <img
                    className="h-16 w-16 object-contain"
                    src={imageSet[currentImage + 1]}
                  />
                </div>
              </div>
            )
          ) : (
            <div className="flex w-full space-x-2">
              {imageSet.map((img, idx) => {
                if (idx !== currentImage) {
                  return (
                    <div key={idx} className="rounded-xl">
                      <img
                        className={"h-12 w-12 object-contain"}
                        src={img}
                        alt={alt}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        <ChevronRightIcon
          onClick={() => {
            if (currentImage === imageSet.length - 1) {
              setCurrentImage(0);
            } else {
              setCurrentImage((prev) => prev + 1);
            }
          }}
          className="h-5 w-5 text-gray-600 transition-all duration-200 hover:text-gray-700"
        />
      </div>
    </>
  );
};

export default ProductSpecificsWrapper;
