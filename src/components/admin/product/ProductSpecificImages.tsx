import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import type { NonEmptyArray } from "../../../types";
import Image from "next/image";

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
          src={imageSet[currentImage] as string}
          alt={alt}
          className="w-full rounded-lg object-cover md:h-96 md:w-96 md:rounded-none"
        />
      </div>
      <div className="flex items-center justify-center gap-x-4">
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
                  <div className="absolute h-full w-full rounded-lg bg-white opacity-50 md:rounded-none"></div>
                  <img
                    alt=""
                    className="h-20 w-20 rounded-lg object-contain  md:rounded-none"
                    src={imageSet[imageSet.length - 1] as string}
                  />
                </div>
                <div className="relatve rounded-xl border-gray-500 md:rounded-none">
                  <img
                    alt=""
                    className=" h-20 w-20 rounded-lg object-contain md:rounded-none"
                    src={imageSet[currentImage]}
                  />
                </div>
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full rounded-lg bg-white opacity-50 md:rounded-none"></div>

                  <img
                    className="h-20 w-20 rounded-lg object-contain md:rounded-none"
                    src={imageSet[currentImage + 1] as string}
                    alt=""
                  />
                </div>
              </div>
            ) : currentImage === imageSet.length - 1 ? (
              <div className="flex w-full space-x-2">
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full rounded-lg bg-white opacity-50 md:rounded-none"></div>
                  <img
                    className="h-20 w-20 rounded-lg object-contain md:rounded-none"
                    src={imageSet[currentImage - 1] as string}
                    alt=""
                  />
                </div>
                <div className="relative rounded-xl  border-gray-500">
                  <img
                    className="h-20 w-20 rounded-lg object-contain md:rounded-none"
                    alt=""
                    src={imageSet[currentImage] as string}
                  />
                </div>
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full rounded-lg bg-white opacity-50 md:rounded-none"></div>
                  <img
                    alt=""
                    className="h-20 w-20 rounded-lg object-contain md:rounded-none"
                    src={imageSet[0]}
                  />
                </div>
              </div>
            ) : (
              <div className="flex w-full space-x-2">
                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>
                  <img
                    alt=""
                    className="h-20 w-20 rounded-lg object-contain md:rounded-none"
                    src={imageSet[currentImage - 1] as string}
                  />
                </div>
                <div className="relative rounded-xl ">
                  <img
                    alt=""
                    className="h-20 w-20 rounded-lg object-contain md:rounded-none"
                    src={imageSet[currentImage] as string}
                  />
                </div>

                <div className="relative rounded-xl">
                  <div className="absolute h-full w-full bg-white opacity-50"></div>
                  <img
                    alt=""
                    className="h-20 w-20 rounded-lg object-contain md:rounded-none"
                    src={imageSet[currentImage + 1] as string}
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
                        className={
                          "h-12 w-12 rounded-lg object-contain md:rounded-none"
                        }
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
          className="h-6 w-6 text-gray-600 transition-all duration-200 hover:text-gray-700 md:h-5 md:w-5"
        />
      </div>
    </>
  );
};

export default ProductSpecificImages;
