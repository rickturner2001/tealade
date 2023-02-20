import { XMarkIcon } from "@heroicons/react/24/solid";
import type { Category } from "@prisma/client";
import {
  type Dispatch,
  type SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import type { ProductWithTags, NonEmptyArray } from "../../../../types";
import { api } from "../../../../utils/api";
import LanguageContext from "../../../context/LanugageContext";
import Spinner from "../../../Spinner";
import CategoryScrolldown from "../../subComponents/dropdowns";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ProductData = ({
  product,
  productNameValue,
  setProductNameValue,
  selectedSectionLabel,
  setSelectedSectionLabel,
}: {
  product: ProductWithTags;
  productNameValue: string;
  setProductNameValue: Dispatch<SetStateAction<string>>;
  selectedSectionLabel: { label: string; id: string };
  setSelectedSectionLabel: Dispatch<
    SetStateAction<{ label: string; id: string }>
  >;
}) => {
  const { language } = useContext(LanguageContext);

  const copy = {
    en: {
      productName: "Product name",
      productTags: "Product tags",
      addTag: "Add new tag",
      productCategory: "Section",
    },
    it: {
      productName: "Nome del prodotto",
      addTag: "Aggiungi etichetta",
      productTags: "Etichette del prodotto",
      productCategory: "Sezione",
    },
  };

  const utils = api.useContext();

  const { mutate: addTagMutation, isLoading } =
    api.products.addNewTag.useMutation({
      onSuccess: () => {
        utils.products.invalidate().catch((error) => console.error(error));
      },
    });
  const { mutate: deleteTagMutation, isLoading: loadingDeletion } =
    api.products.deleteTag.useMutation({
      onSuccess: () => {
        utils.products.invalidate().catch((error) => console.error(error));
      },
    });

  const { data: sections } = api.sections.getAllSesctions.useQuery();
  const currentCopy = language === "english" ? copy.en : copy.it;
  const labelRef = useRef<HTMLInputElement>(null);

  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

  const [currenteDeletionLabel, setCurrentDeletionLabel] = useState("");
  return (
    <div className="flex w-full  flex-col items-start gap-x-24 px-12 py-12 md:flex-row">
      <div className="rounded-lg md:rounded-none">
        <img
          src={product.defaultThumbnail}
          alt={product.description}
          className={"h-60 rounded-lg object-contain md:rounded-none"}
        />
      </div>
      {/* FLEX RIGHT*/}
      <div className="mt-6 flex w-full flex-col md:mt-0">
        <label htmlFor="productName" className="mb-2 text-sm font-medium">
          {currentCopy.productName}
        </label>
        <input
          type="text"
          onChange={(e) => setProductNameValue(e.target.value)}
          id="productName"
          className="w-full rounded-md bg-gray-100 p-2 text-xs text-gray-600 focus:outline-none md:text-sm"
          defaultValue={productNameValue}
        />
        <label htmlFor="addtag" className="mt-8 mb-2 text-sm font-medium">
          {currentCopy.productTags}
        </label>
        <div className="flex w-full flex-wrap items-center gap-y-2 space-x-2 ">
          {product.tags.map((tag) => {
            return (
              <div
                key={tag.label}
                className="flex items-center rounded-md bg-orange-400 p-2 text-xs font-bold text-white md:p-3"
              >
                <span>{tag.label}</span>
                {loadingDeletion && currenteDeletionLabel === tag.label ? (
                  <Spinner className="ml-2 inline h-4 w-4 animate-spin text-white" />
                ) : (
                  <XMarkIcon
                    onClick={() => {
                      setCurrentDeletionLabel(tag.label);
                      deleteTagMutation({ label: tag.label, pid: product.pid });
                    }}
                    className="ml-2 inline-flex h-4 w-4 stroke-2 text-white hover:text-gray-100"
                  />
                )}
              </div>
            );
          })}
          <input
            type="text"
            className="w-max border-2 border-dashed border-gray-300 p-2 text-xs text-gray-600 placeholder:text-center placeholder:text-gray-600 focus:outline-none md:w-32"
            placeholder={currentCopy.addTag}
            ref={labelRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (labelRef?.current?.value) {
                  addTagMutation({
                    label: labelRef.current.value,
                    pid: product.pid,
                  });
                  labelRef.current.value = "";
                }
              }
            }}
          />
          {isLoading && (
            <Spinner
              className={"ml-2 inline h-4 w-4 animate-spin text-white"}
            />
          )}
        </div>
        <label className="mb-2 mt-8 text-sm font-medium">
          {currentCopy.productCategory}
        </label>
        {/* Section Scrolldown */}
        <div className="relative w-full lg:w-1/2">
          <button
            onClick={() => setIsSectionMenuOpen((prev) => !prev)}
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="inline-flex  items-center   rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {selectedSectionLabel.label === ""
              ? "Assign to a section"
              : selectedSectionLabel.label}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </button>
          {isSectionMenuOpen && (
            <div
              id="dropdown"
              className="absolute top-14 right-0  z-10 w-full divide-y divide-gray-100 rounded-lg border bg-white shadow dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {sections &&
                  sections.map((section) => {
                    return (
                      <li
                        onClick={() => {
                          setSelectedSectionLabel({
                            label: section.label,
                            id: section.id,
                          });
                          setIsSectionMenuOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-gray-100 "
                        key={section.id}
                      >
                        {section.label}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductData;
