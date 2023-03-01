import notFound from "../../../../public/media/images/not-found.png";
import { useContext } from "react";
import Link from "next/link";
import { api } from "../../../utils/api";

import LanguageContext from "../../context/LanugageContext";
import Image from "next/image";
import { ImportedProductCard } from "../cards/ImportedProductCard";

const StoreProductGrid = () => {
  const { data: registeredProducts } =
    api.products.getAllStoreProducts.useQuery();

  const copy = {
    en: {
      notFound: "Could not find any products",
      findProducsts: "Find Products",
    },
    it: {
      notFound: "Nessun prodotto listato",
      findProducsts: "Trova prodotti",
    },
  };

  const { language } = useContext(LanguageContext);

  if (!registeredProducts) {
    return (
      <div className=" grid grid-cols-1 gap-x-12 gap-y-12 py-6  px-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
  if (registeredProducts.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-12">
        <div className="h-96">
          <Image
            fill={true}
            src={notFound.src}
            className=" mb-12 h-full object-cover"
            alt="not found"
          />
        </div>
        {language === "english" ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-2xl font-bold">{copy.en.notFound}</p>
            <Link
              href={"/admin/find-products/1"}
              className="mt-4 w-full rounded-md bg-emerald-400 py-4 px-8 text-center text-sm font-bold text-white"
            >
              {copy.en.findProducsts}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-2xl font-bold">{copy.it.notFound}</p>
            <Link
              href={"/admin/find-products/1"}
              className="mt-4 w-full rounded-md bg-emerald-400 py-4 px-8 text-center text-sm font-bold text-white"
            >
              {copy.it.findProducsts}
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 px-4">
        {registeredProducts.map((prod) => {
          return <ImportedProductCard key={prod.pid} product={prod} />;
        })}
      </div>
    </>
  );
};

// const ProductCard = ({ product }: { product: StoreProductIncludeAll }) => {
//   const utils = api.useContext();

//   const { mutate: setProductToEditMutation, isLoading: loadProductToEdit } =
//     api.products.setProductToEdit.useMutation({
//       onSuccess: async () => {
//         await utils.products.invalidate();
//       },
//     });

//   const { language } = useContext(LanguageContext);

//   const [isOpenImageView, setIsOpenImageView] = useState(false);

//   const { mutate: removeProduct, isLoading: loadingRemoval } =
//     api.products.deleteProduct.useMutation({
//       onSuccess: () => {
//         utils.products.invalidate().catch((error) => console.error(error));
//       },
//     });

//   const productPrice = evaluatePriceRange(
//     product.variants.map((variant) => variant.price)
//   );

//   return (
//     <div
//       className={`relative z-10 flex  w-full  max-w-sm flex-col items-center justify-center space-y-8 rounded-2xl bg-white  p-4 py-12 shadow-md`}
//     >
//       <div className="h-full w-full">
//         <div className="mb-4 flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1">
//           {product.sections.map((section) => {
//             return (
//               <span
//                 key={section.id}
//                 className="w-max rounded-md bg-cyan-100 px-2 py-1 text-xs text-cyan-900"
//               >
//                 {section.label}
//               </span>
//             );
//           })}
//         </div>
//         <div className="flex items-center justify-center">
//           <ImageView
//             isOpen={isOpenImageView}
//             setIsOpen={setIsOpenImageView}
//             imageSet={product.imageSet}
//           >
//             <button
//               onClick={() => setIsOpenImageView(true)}
//               className="relative h-48 w-48"
//             >
//               <Image
//                 fill={true}
//                 alt={product.name}
//                 src={product.defaultThumbnail}
//                 className=" h-48 w-48 object-contain"
//               />
//             </button>
//           </ImageView>
//         </div>
//         <ul className="mt-4 flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1">
//           {product.tags.map((tag) => {
//             return (
//               <li
//                 className="rounded-md bg-orange-100 py-1 px-2 text-xs text-orange-900"
//                 key={tag.label}
//               >
//                 {tag.label}
//               </li>
//             );
//           })}
//         </ul>
//         <div className="flex  w-full flex-col items-center justify-center space-y-1 text-center">
//           <p className="mt-4 mb-4 w-full overflow-hidden truncate text-ellipsis text-sm font-semibold text-gray-800">
//             {product.name}
//           </p>
//           <div className=" flex w-full items-center justify-center">
//             {product.discount && (
//               <span className="block w-max rounded-md bg-purple-100 py-1 px-2 text-xs text-purple-900">
//                 {product.discount.label} ({product.discount.value}%)
//               </span>
//             )}
//           </div>
//           <p className="text-md mt-2 font-medium text-gray-700">
//             {product.discount ? (
//               <span className="inline-flex ">
//                 $<span className="mr-1 line-through">{productPrice}</span>
//                 <span>
//                   {getProductDiscount(productPrice, product.discount.value)}
//                 </span>
//               </span>
//             ) : (
//               `$${productPrice}`
//             )}
//           </p>
//         </div>
//         <div className="mt-12 flex flex-col items-center justify-center">
//           {loadProductToEdit ? (
//             <ButtonPrimary label="loading">
//               <Spinner className="mr-2 h-6 w-5 animate-spin" />
//             </ButtonPrimary>
//           ) : (
//             <ButtonPrimary
//               label="Move back to Imports"
//               handler={() => {
//                 setProductToEditMutation({ pid: product.pid });
//               }}
//             />
//           )}
//           {loadingRemoval ? (
//             <button className="py-3 px-8 text-sm font-medium text-red-500">
//               <Spinner className=" mr-2 inline h-4 w-4 animate-spin text-white" />
//               {language === "english" ? "Loading..." : "Caricamento..."}
//             </button>
//           ) : (
//             <ButtonNoBg
//               label="Remove"
//               textColor="text-red-500"
//               handler={() => {
//                 removeProduct({ pid: product.pid });
//               }}
//             ></ButtonNoBg>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
export default StoreProductGrid;
