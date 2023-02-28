import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@prisma/client";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { api } from "../../../utils/api";
import Spinner from "../../../components/Spinner";
import Image from "next/image";

const ListProductDisplay = ({
  pageNumber,
  category,
}: {
  pageNumber: number;
  category?: string;
}) => {
  const pageData = useState(40);

  const { data } = api.cjApi.getListProducts.useQuery({
    pageNum: (pageNumber ? (+pageNumber as number | undefined) : 1) ?? 1,
    perPage: pageData[0],
    categoryKeyword: category ?? null,
  });

  const { data: registeredProducts } = api.products.getAllProducts.useQuery();

  if (!data || !registeredProducts) {
    return (
      <div className=" grid grid-cols-1 gap-x-12 gap-y-12 py-6  px-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((idx) => {
          return (
            <div
              key={idx}
              role="status"
              className="max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow "
            >
              <div className="bg-gray-30 mb-4 flex h-48 items-center justify-center rounded">
                <svg
                  className="h-12 w-12 text-gray-200 "
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
              <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 "></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 "></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 "></div>
              <div className="h-2 rounded-full bg-gray-200 "></div>
              <div className="mt-4 flex items-center space-x-3">
                <svg
                  className="h-14 w-14 text-gray-200 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>
                  <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200 "></div>
                  <div className="h-2 w-48 rounded-full bg-gray-200 "></div>
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          );
        })}
      </div>
    );
  }
  if ((data.data && data.data.list.length == 0) || data.data == undefined) {
    return <div>No Products</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 py-6  px-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.list.map((prod) => {
          return (
            <ProductCard
              key={prod.pid}
              category={prod.categoryName}
              pid={prod.pid}
              image={prod.productImage}
              name={prod.productNameEn}
              registeredProducts={registeredProducts}
              price={prod.sellPrice}
            />
          );
        })}
      </div>
      <div className="my-12  flex w-full items-center justify-center space-x-4">
        {pageNumber && +pageNumber > 1 && (
          <Link
            href={
              category
                ? `/admin/find-products/${category}/${+pageNumber - 1}`
                : `/admin/find-products/${+pageNumber - 1}Chevron`
            }
            className="rounded-md border bg-gray-100  p-2 text-sm font-bold text-gray-800"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>
        )}
        <button className="rounded-md border bg-gray-100 px-8 py-2 text-sm font-bold text-gray-800">
          {pageNumber}
        </button>
        {pageNumber && (
          <Link
            href={
              category
                ? `/admin/find-products/${category}/${+pageNumber + 1}`
                : `/admin/find-products/${+pageNumber + 1}`
            }
            className="rounded-md border bg-gray-100 p-2 text-sm font-bold text-gray-800"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
    </>
  );
};

const ProductCard = ({
  image,
  category,
  name,
  price,
  pid,
  registeredProducts,
}: {
  image: string;
  pid: string;
  name: string;
  category: string;
  price: number;
  registeredProducts: Product[];
}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const isListed = registeredProducts.map((prod) => prod.pid).includes(pid);
  const utils = api.useContext();
  const { mutate: removeProduct, isLoading: loadingRemoval } =
    api.products.deleteProduct.useMutation({
      onSuccess: () => {
        utils.products.invalidate().catch((error) => console.error(error));
      },
    });
  const { mutate: blindProductListing, isLoading: loadingRegistration } =
    api.cjApi.blindProductRegistration.useMutation({
      onSuccess: () => {
        utils.products.invalidate().catch((error) => console.error(error));
      },
    });

  return (
    <motion.div
      onHoverStart={() => setIsButtonVisible(true)}
      onHoverEnd={() => setIsButtonVisible(false)}
      className={`relative z-10 flex  max-w-lg  flex-col items-center justify-center space-y-8 rounded-2xl  bg-white py-12 px-12 shadow-md`}
    >
      {isListed && !loadingRegistration && !loadingRemoval && (
        <span
          className={`absolute top-0 left-0 rounded-tl-lg rounded-br-lg ${
            isButtonVisible ? "bg-red-500" : "bg-emerald-400"
          } p-2`}
        >
          {isButtonVisible ? (
            <XMarkIcon className="h-5 w-5 text-white" />
          ) : (
            <CheckIcon className="h-5 w-5 text-white" />
          )}
        </span>
      )}
      <Link href={`/admin/product/${pid}`} className="h-full w-full">
        <img alt="" src={image} className="h-48 w-48 object-contain" />
        <div className="mt-4 flex  w-full flex-col items-center justify-center space-y-1 text-center">
          <p className="mt-4 w-full overflow-hidden truncate text-ellipsis text-sm font-semibold text-gray-800">
            {name}
          </p>
          <p className="text-xs text-gray-700">{category}</p>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center">
          <p className="font-semibold ">${price}</p>
          <p className="font-semibole text-sm">Product Cost</p>
        </div>
      </Link>
      {isListed ? (
        loadingRemoval ? (
          <motion.button
            animate={isButtonVisible ? { opacity: 1 } : { opacity: 0 }}
            className={`absolute -bottom-5 left-0 z-20 w-full rounded-b-xl border-4 border-blue-500 bg-blue-500 py-4 px-5 text-sm font-semibold text-white`}
          >
            <Spinner className=" mr-2 inline h-4 w-4 animate-spin text-white" />
            Loading...
          </motion.button>
        ) : (
          <motion.button
            onClick={() => {
              removeProduct({ pid: pid });
            }}
            animate={isButtonVisible ? { opacity: 1 } : { opacity: 0 }}
            className={`absolute -bottom-5 left-0 z-20 w-full rounded-b-xl border-4 py-4 px-5 text-sm font-semibold text-white ${"border-red-500 bg-red-500"}`}
          >
            Remove from import list
          </motion.button>
        )
      ) : loadingRegistration ? (
        <motion.button
          animate={isButtonVisible ? { opacity: 1 } : { opacity: 0 }}
          className={`absolute -bottom-5 left-0 z-20 w-full rounded-b-xl border-4 border-blue-500 bg-blue-500 py-4 px-5 text-sm font-semibold text-white`}
        >
          <Spinner className=" mr-2 inline h-4 w-4 animate-spin text-white" />
          Loading...
        </motion.button>
      ) : (
        <motion.button
          onClick={() => blindProductListing({ pid: pid })}
          animate={isButtonVisible ? { opacity: 1 } : { opacity: 0 }}
          className={`absolute -bottom-5 left-0 z-20 w-full rounded-b-xl border-4 py-4 px-5 text-center text-sm font-semibold text-white ${"border-emerald-400 bg-emerald-400"}`}
        >
          Add to import list
        </motion.button>
      )}
    </motion.div>
  );
};
export default ListProductDisplay;
