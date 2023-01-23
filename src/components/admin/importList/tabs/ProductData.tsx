import { XMarkIcon } from "@heroicons/react/24/solid";
import { Category } from "@prisma/client";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { ProductWithTags, NonEmptyArray } from "../../../../types";
import { api } from "../../../../utils/api";
import LanguageContext from "../../../context/LanugageContext";
import Spinner from "../../../Spinner";
import CategoryScrolldown from "../../subComponents/dropdowns";

const ProductData = ({
  product,
  selectedCategory,
  setSelectedCategory,
}: {
  product: ProductWithTags;

  selectedCategory: Category | null;
  setSelectedCategory: Dispatch<SetStateAction<Category | null>>;
}) => {
  const { language } = useContext(LanguageContext);

  const copy = {
    en: {
      productName: "Product name",
      productTags: "Product tags",
      addTag: "Add new tag",
      productCategory: "Category",
    },
    it: {
      productName: "Nome del prodotto",
      addTag: "Aggiungi etichetta",
      productTags: "Etichette del prodotto",
      productCategory: "Categoria",
    },
  };

  const utils = api.useContext();

  const {
    mutate: addTagMutation,
    isLoading,
    isError,
  } = api.products.addNewTag.useMutation({
    onSuccess: () => {
      utils.products.invalidate().catch((error) => console.error(error));
    },
  });
  const {
    mutate: deleteTagMutation,
    isLoading: loadingDeletion,
    isError: errorDeletion,
  } = api.products.deleteTag.useMutation({
    onSuccess: () => {
      utils.products.invalidate().catch((error) => console.error(error));
    },
  });

  const { data: categories } = api.products.getAllCategories.useQuery();
  const currentCopy = language === "english" ? copy.en : copy.it;
  const labelRef = useRef<HTMLInputElement>(null);

  const [currenteDeletionLabel, setCurrentDeletionLabel] = useState("");
  return (
    <div className="flex w-full  items-start gap-x-24 px-12 py-12">
      <div>
        <img
          src={product.defaultThumbnail}
          alt={product.description}
          className={"h-60 object-contain"}
        />
      </div>
      {/* FLEX RIGHT*/}
      <div className="flex w-full flex-col">
        <label htmlFor="productName" className="mb-2 text-sm font-medium">
          {currentCopy.productName}
        </label>
        <input
          type="text"
          id="productName"
          className="w-full rounded-md bg-gray-100 p-2 text-sm text-gray-600 focus:outline-none"
          defaultValue={product.name}
        />
        <label htmlFor="addtag" className="mt-8 mb-2 text-sm font-medium">
          {currentCopy.productTags}
        </label>
        <div className="flex w-full items-center space-x-2">
          {product.tags.map((tag) => {
            return (
              <div
                key={tag.label}
                className="flex items-center rounded-md bg-orange-400 p-3 text-xs font-bold text-white"
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
            className="w-32 border-2 border-dashed border-gray-300 p-2 text-xs text-gray-600 placeholder:text-center placeholder:text-gray-600 focus:outline-none"
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
        <label className="mb02 mt-8 text-sm font-medium">
          {currentCopy.productCategory}
        </label>
        {categories && categories[0] && (
          <CategoriesScrolldownWrapper
            categories={categories as NonEmptyArray<Category>}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </div>
    </div>
  );
};

const CategoriesScrolldownWrapper = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: {
  categories: NonEmptyArray<Category>;
  selectedCategory: Category | null;
  setSelectedCategory: Dispatch<SetStateAction<Category | null>>;
}) => {
  return (
    <CategoryScrolldown
      setSelectedCategory={setSelectedCategory}
      selectedCategory={selectedCategory}
      categories={categories}
      defaultSelection={categories[0]}
    />
  );
};

export default ProductData;
