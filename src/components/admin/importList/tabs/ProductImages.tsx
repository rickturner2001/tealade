import { CheckIcon } from "@heroicons/react/24/solid";
import type { Dispatch, SetStateAction } from "react";
import type { ProductWithTags } from "../../../../types";

const ProductImages = ({
  product,
  setImagesStates,
  imagesStates,
}: {
  product: ProductWithTags;
  imagesStates: boolean[];

  setImagesStates: Dispatch<SetStateAction<boolean[]>>;
}) => {
  return (
    <div className="grid w-full grid-cols-1  gap-x-12 gap-y-12 bg-white p-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {product.imageSet.map((image, idx) => {
        return (
          <div
            onClick={() => {
              setImagesStates((prev) => {
                const curImages = [...prev];

                curImages[idx] = !curImages[idx];
                return curImages;
              });
            }}
            key={image}
            className={`relative flex flex-col items-center justify-center rounded-md border-2 ${
              imagesStates[idx] ? " border-emerald-500" : "border-transparent"
            }  p-6`}
          >
            <div className="absolute top-0 left-0">
              {imagesStates[idx] && (
                <button
                  className={`rounded-br-lg bg-emerald-500 p-1 font-bold text-white`}
                >
                  <CheckIcon className="h-5 w-5 stroke-2 text-white" />
                </button>
              )}
            </div>
            <img
              src={image}
              alt={product.description}
              className={"h-72 object-contain"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductImages;
