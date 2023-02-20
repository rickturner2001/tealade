import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { api } from "../../../utils/api";
import Spinner from "../../../components/Spinner";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import ProductSelection from "./ProductSelection";
import Link from "next/link";

const BuilderLayout = () => {
  const utils = api.useContext();

  const [currentDeletion, setCurrentDeletion] = useState("");

  const { data: sections } = api.sections.getAllSesctions.useQuery();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const sectionNameRef = useRef<HTMLInputElement>(null);
  const [sectionThumbnail, setSectionThumbnail] = useState("");

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
    <div className="m-8 flex flex-wrap gap-x-4 gap-y-4 rounded-md shadow-md  ">
      {sections && sections.length < 4 ? (
        <>
          <div className="relative   flex h-max w-full flex-col justify-between rounded-md border bg-white p-6 shadow-sm">
            <div className=" w-full">
              <span className=" inline-block p-2 text-sm font-medium">
                Section Label
              </span>
              <input
                ref={sectionNameRef}
                className="w-full rounded-md border  py-2  px-4 text-sm focus:outline-none"
              />

              <div className="my-8">
                <span className=" inline-block p-2 text-sm font-medium ">
                  Products
                </span>

                <ProductSelection
                  sectionThumbnail={sectionThumbnail}
                  setSectionThumbnail={setSectionThumbnail}
                  setSelectedProducts={setSelectedProducts}
                />
              </div>
            </div>
            {!isLoading ? (
              <button
                onClick={() => {
                  const sectionLabel = sectionNameRef?.current?.value;

                  if (sectionLabel && selectedProducts.length) {
                    createSectionMutation({
                      label: sectionLabel,
                      pids: selectedProducts,
                      thumbnail: sectionThumbnail,
                    });
                    setSelectedProducts([]);
                    setSectionThumbnail("");
                    sectionNameRef.current.value = "";
                  }
                }}
                className={`focus:ring-300 flex w-full items-center  justify-center self-center rounded-lg bg-blue-100 py-2.5  px-5 text-center text-sm font-medium text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-300 `}
              >
                <span className="w-full text-center">Add section</span>
              </button>
            ) : (
              <button className=" relative flex w-full items-center justify-center space-x-2  rounded-lg bg-blue-100 px-5 py-2.5 text-sm font-bold text-blue-900 hover:bg-blue-200  focus:ring-4 focus:ring-blue-300">
                <Spinner className="h-5 w-5 animate-spin" />
                <span>Loading</span>
              </button>
            )}
          </div>

          {sections.map((section) => {
            return (
              <div
                className="flex h-max flex-col space-y-4 rounded-lg bg-white p-4"
                key={section.id}
              >
                <p className="text-sm font-medium text-gray-700">
                  {section.label}
                </p>
                <img
                  src={section.thumbnail}
                  className="w-full rounded-lg object-contain md:h-64 md:w-64"
                />

                <div className="flex space-x-2">
                  <Link
                    href={`/admin/section/${section.id}`}
                    className="block w-1/2 rounded-lg border bg-blue-100 py-2.5 px-5 text-center text-sm font-medium text-blue-900  hover:bg-blue-200  focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Edit
                  </Link>
                  {isLoadingDeletion && currentDeletion === section.id ? (
                    <button className="flex w-1/2 items-center rounded-lg bg-red-100 px-5 py-2.5 text-center  text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-300">
                      <Spinner className="h-5 w-5 animate-spin" />
                      <span className="ml-4">Loading</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        removeSectionMutation({ sid: section.id });
                        setCurrentDeletion(section.id);
                      }}
                      className="w-1/2 items-center rounded-lg bg-red-100 px-5 py-2.5 text-center text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
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
                  className="flex h-max flex-col space-y-4 rounded-lg bg-white p-4"
                  key={section.id}
                >
                  <p className="text-sm font-medium text-gray-700">
                    {section.label}
                  </p>
                  <img
                    src={section.thumbnail}
                    className="w-full rounded-lg object-contain md:h-64 md:w-64"
                  />

                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/section/${section.id}`}
                      className="block w-1/2 rounded-lg border bg-blue-100 py-2.5 px-5 text-center text-sm font-medium text-blue-900  hover:bg-blue-200  focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Edit
                    </Link>
                    {isLoadingDeletion && currentDeletion === section.id ? (
                      <button className="flex w-1/2 items-center rounded-lg bg-red-100 px-5 py-2.5 text-center  text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-300">
                        <Spinner className="h-5 w-5 animate-spin" />
                        <span className="ml-4">Loading</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          removeSectionMutation({ sid: section.id });
                          setCurrentDeletion(section.id);
                        }}
                        className="w-1/2 items-center rounded-lg bg-red-100 px-5 py-2.5 text-center text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
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

export default BuilderLayout;
