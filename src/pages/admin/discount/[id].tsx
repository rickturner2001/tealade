import { useContext, useState } from "react";
import Dashboard from "../../../components/admin/Dashboard";
import { Language, StoreProductIncludeAll } from "../../../types";
import { api } from "../../../utils/api";
import discounts from "../discounts";
import { useRouter } from "next/router";
import LanguageContext from "../../../components/context/LanugageContext";
import { ProductVariant } from "@prisma/client";
import Spinner from "../../../components/Spinner";
import { evaluatePriceRange, getProductDiscount } from "../section/[sid]";

const DiscountDisplaySectionWrapper = () => {
  const [iseMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("english");

  const router = useRouter();

  const { id: did } = router.query;

  return (
    <Dashboard
      isMenuOpen={iseMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      setLanguage={setLanguage}
      title="Discounts"
    >
      {did ? <DiscountDisplaySection did={did as string} /> : <></>}
    </Dashboard>
  );
};

const DiscountDisplaySection = ({ did }: { did: string }) => {
  const { data: discount } = api.discounts.getDiscountById.useQuery({ did });
  return (
    <div className="mx-auto mt-12 flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-4">
      {discount &&
        discount.products.map((prod) => {
          return <ProductCard key={prod.pid} product={prod} did={did} />;
        })}
    </div>
  );
};
const ProductCard = ({
  product,
  did,
}: {
  product: StoreProductIncludeAll;
  did: string;
}) => {
  const utils = api.useContext();

  const { mutate: setProductToEditMutation, isLoading: loadProductToEdit } =
    api.products.setProductToEdit.useMutation({
      onSuccess: async () => {
        await utils.products.invalidate();
      },
    });

  const { language } = useContext(LanguageContext);

  const evaluatePrice = (variants: ProductVariant[]) => {
    if (variants.length === 1) {
      return [variants[0]?.price as number];
    }
    const min = Math.min(...variants.map((variant) => variant.price));
    const max = Math.max(...variants.map((variant) => variant.price));

    if (min === max) {
      return [min];
    }

    return [min, max];
  };

  const { mutate: removeProduct, isLoading: loadingRemoval } =
    api.products.removeDiscountByProductId.useMutation({
      onSuccess: async () => {
        await utils.products.invalidate();
        await utils.discounts.invalidate();
      },
    });

  const productPrice = evaluatePriceRange(
    product.variants.map((variant) => variant.price)
  );

  return (
    <div
      className={`relative z-10 flex  h-full w-full  max-w-sm flex-col  items-center justify-between space-y-8 rounded-2xl bg-white  p-4 py-12 shadow-md`}
    >
      <div className="flex h-full w-full flex-col justify-between gap-y-4">
        <div className="mb-4 flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1">
          {product.sections.map((section) => {
            return (
              <span
                key={section.id}
                className="w-max rounded-md bg-cyan-100 px-2 py-1 text-xs text-cyan-900"
              >
                {section.label}
              </span>
            );
          })}
        </div>
        <div className="flex items-center justify-center">
          <img src={product.defaultThumbnail} className="h-48 object-contain" />
        </div>
        <ul className="mt-4 flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1">
          {product.tags.map((tag) => {
            return (
              <li
                className="rounded-md bg-orange-100 py-1 px-2 text-xs text-orange-900"
                key={tag.label}
              >
                {tag.label}
              </li>
            );
          })}
        </ul>
        <div className="flex  w-full flex-col items-center justify-center space-y-1 text-center">
          <p className="mt-4 mb-4 w-full overflow-hidden truncate text-ellipsis text-sm font-semibold text-gray-800">
            {product.name}
          </p>
          <div className=" flex w-full items-center justify-center">
            {product.discount && (
              <span className="block w-max rounded-md bg-purple-100 py-1 px-2 text-xs text-purple-900">
                {product.discount.label} ({product.discount.value}%)
              </span>
            )}
          </div>
          <p className="text-md mt-2 font-medium text-gray-700">
            {product.discount ? (
              <span className="inline-flex ">
                $<span className="mr-1 line-through">{productPrice}</span>
                <span>
                  {getProductDiscount(productPrice, product.discount.value)}
                </span>
              </span>
            ) : (
              `$${productPrice}`
            )}
          </p>
        </div>
        <div className="flex  flex-col items-center justify-center">
          {loadingRemoval ? (
            <button className="py-3 px-8 text-sm font-medium text-red-500">
              <Spinner className=" mr-2 inline h-4 w-4 animate-spin text-white" />
              {language === "english" ? "Loading..." : "Caricamento..."}
            </button>
          ) : (
            <button
              onClick={() => {
                removeProduct({ pid: product.pid, did });
              }}
              className="w-full rounded-md bg-red-100 py-3 px-8 text-sm font-medium text-red-900 hover:bg-red-200"
            >
              {language === "english" ? "Remove" : "Rimuovi"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountDisplaySectionWrapper;