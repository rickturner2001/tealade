import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { api } from "../../../utils/api";
import Spinner from "../../../components/Spinner";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { type StoreProduct } from "../../../types";

const BuilderLayout = () => {
  const utils = api.useContext();

  const [currentDeletion, setCurrentDeletion] = useState("");

  const { data: sections } = api.sections.getAllSesctions.useQuery();
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(
    null
  );
  const sectionNameRef = useRef<HTMLInputElement>(null);

  const {
    mutate: createSectionMutation,
    isSuccess,
    isError,
    isLoading,
  } = api.sections.createSectionWithProducts.useMutation({
    onSuccess: async () => {
      await utils.sections.getAllSesctions.invalidate();
    },
  });

  const {
    mutate: removeSectionMutation,
    isLoading: isLoadingDeletion,
    isError: isDeletionError,
  } = api.sections.deleteSection.useMutation({
    onSuccess: async () => {
      await utils.sections.getAllSesctions.invalidate();
    },
  });

  return (
    <div className="m-8 grid min-h-[20rem] grid-cols-4 gap-x-4 rounded-md p-8 shadow-md">
      {sections && sections.length < 4 ? (
        <>
          <div className="relative flex flex-col justify-between rounded-md border bg-white p-6 shadow-sm">
            <div className="w-full">
              <span className=" inline-block p-2 text-sm ">Section Label</span>
              <input
                ref={sectionNameRef}
                className="w-full rounded-md border border-blue-500 py-2  px-4 text-sm focus:outline-none"
              />

              <div className="my-6">
                <span className=" inline-block p-2 text-sm ">Lead product</span>

                <ProductSelection setSelectedProduct={setSelectedProduct} />
              </div>
            </div>
            {!isLoading ? (
              <button
                onClick={() => {
                  const sectionLabel = sectionNameRef?.current?.value;

                  console.debug("label: ", sectionLabel);
                  console.debug("prod: ", selectedProduct);

                  if (sectionLabel && selectedProduct) {
                    createSectionMutation({
                      label: sectionLabel,
                      pids: [selectedProduct.pid],
                      thumbnail: selectedProduct.defaultThumbnail,
                    });
                  }
                }}
                className={`flex w-full items-center  justify-center self-center rounded-md bg-blue-500 py-3 px-8 text-center text-sm font-bold text-white`}
              >
                <span className="w-full text-center">Add section</span>
              </button>
            ) : (
              <button className=" flex w-full items-center justify-center space-x-2  rounded-md bg-blue-500 px-8 py-3 text-sm  font-bold text-white">
                <Spinner className="h-5 w-5 animate-spin" />
                <span>Loading</span>
              </button>
            )}
          </div>

          {sections.map((section) => {
            return (
              <div
                className="flex flex-col space-y-4 bg-white p-4"
                key={section.id}
              >
                <img
                  src={section.thumbnail}
                  className="h-full w-full object-contain"
                />
                <div className="flex space-x-2">
                  <button className="w-full rounded-md border border-gray-400 bg-white py-3 px-8 text-sm font-semibold text-gray-600">
                    {section.label}
                  </button>
                  {isLoadingDeletion && currentDeletion === section.id ? (
                    <button className="items-cente flex w-full space-x-2 rounded-md border border-red-800 bg-red-500/50 py-3 px-8 text-sm font-semibold text-red-700">
                      <Spinner className="h-5 w-5 animate-spin" />
                      <span>Loading</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        removeSectionMutation({ sid: section.id });
                        setCurrentDeletion(section.id);
                      }}
                      className="flex-grow rounded-md border border-red-800 bg-red-500/50 py-3 px-8 text-sm font-semibold text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {sections ? (
            sections.map((section) => {
              return (
                <div
                  className="flex flex-col space-y-4 bg-white p-4"
                  key={section.id}
                >
                  <img
                    src={section.thumbnail}
                    className="h-full w-full object-contain"
                  />
                  <div className="flex space-x-2">
                    <button className="w-full rounded-md border border-gray-400 bg-white py-3 px-8 text-sm font-semibold text-gray-600">
                      {section.label}
                    </button>
                    {isLoadingDeletion && currentDeletion === section.id ? (
                      <button className="items-cente rflex w-full flex-grow space-x-2 rounded-md border border-red-800 bg-red-500/50 py-3 px-8 text-sm font-semibold text-red-700">
                        <Spinner className="animate-spid h-5 w-5" />
                        <span>Loading</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          removeSectionMutation({ sid: section.id });
                          setCurrentDeletion(section.id);
                        }}
                        className="flex-grow rounded-md border border-red-800 bg-red-500/50 py-3 px-8 text-sm font-semibold text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-4 flex h-full w-full flex-col items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ProductSelection = ({
  setSelectedProduct,
}: {
  setSelectedProduct: Dispatch<SetStateAction<StoreProduct | null>>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<StoreProduct | null>(null);

  const { data: storeProducts } = api.products.getAllStoreProducts.useQuery();

  return (
    <div className="  flex select-none flex-col rounded-md border bg-white p-2 px-4 text-sm font-semibold text-gray-800">
      {/* Active Item */}

      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-2 px-4"
      >
        <div>{!activeProduct ? "Select a product" : activeProduct.name}</div>
        {!activeProduct ? (
          <EyeIcon className="h-5 w-5" />
        ) : (
          <img
            src={activeProduct.defaultThumbnail}
            className="h-12 w-12 rounded-md object-cover"
          />
        )}
      </button>
      {/* List */}
      {isMenuOpen && (
        <ul className="absolute top-0 right-0 flex h-full w-full flex-col overflow-scroll rounded-md border bg-white p-4 pt-9 shadow-sm">
          <button
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className="absolute top-2 right-2 rounded-md border border-red-800 bg-red-500/20 p-0.5 text-red-800"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          {storeProducts &&
            storeProducts.map((prod) => {
              return (
                <li
                  onClick={() => {
                    setSelectedProduct(prod);
                    setActiveProduct(prod);
                    setIsMenuOpen(false);
                  }}
                  key={prod.pid}
                  className="flex items-center space-x-4 py-2 px-4 text-sm transition-all duration-300 hover:bg-gray-100"
                >
                  <img
                    className="h-12 w-12 rounded-md object-cover"
                    src={prod.defaultThumbnail}
                  />
                  <span>{prod.name}</span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default BuilderLayout;
