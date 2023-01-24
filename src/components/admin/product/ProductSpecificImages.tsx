import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { NonEmptyArray } from "../../../types";

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

export default ProductSpecificImages;
