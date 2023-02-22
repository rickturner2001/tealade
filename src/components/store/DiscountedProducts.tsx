import Link from "next/link";
import { api } from "../../utils/api";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { evaluatePriceRange, getProductDiscount } from "./functions";
import Spinner from "../Spinner";
import Image from "next/image";

const DiscountedProducts = () => {
  const { data: products } = api.products.getAllDiscountedProducts.useQuery();

  if (!products) {
    return (
      <div
        className=" flex h-[92vh] w-full items-center justify-center
    "
      >
        <Spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <section className="mx-auto  w-full max-w-7xl px-6 text-center lg:px-0 lg:text-left">
      <h2 className="text-4xl font-bold text-gray-900">Discounted Products</h2>
      <p className="max-w-4xl py-4   text-gray-700">
        Shop our selection of discounted products and save big on your favorite
        items. From apparel to accessories, our sale section offers a wide
        variety of products at unbeatable prices. Don&apos;t miss out on these
        amazing deals - shop now and take advantage of our limited time offers!
      </p>
      <button className="bg-black px-5 py-2.5 font-medium text-white">
        Show all
      </button>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 pt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.pid} className="flex flex-col">
            <Link href={`product/${product.pid}`} className="group">
              <div className="relative">
                <div className=" aspect-w-1  aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7  xl:aspect-h-8">
                  <Image
                    fill={true}
                    src={product.defaultThumbnail}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <span className="absolute top-2 right-2 bg-red-500   py-1 px-2 text-sm font-bold text-white">
                  {product.discount?.value}%
                </span>
              </div>
              <h3 className={`mt-2 text-sm text-gray-700`}>{product.name}</h3>
              <h4 className="mt-1 truncate overflow-ellipsis text-xs text-gray-700">
                {product.category.label}
              </h4>
              {product.shipments[0] && product.discount?.value && (
                <div className="mt-2 flex gap-x-2">
                  <p className="text-lg text-gray-900 line-through">
                    {evaluatePriceRange(
                      product.variants.map((variant) => variant.price),
                      product.shipments[0].cost
                    )}
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    $
                    {getProductDiscount(
                      evaluatePriceRange(
                        product.variants.map((variant) => variant.price),
                        product.shipments[0].cost
                      ),
                      product.discount?.value
                    )}
                  </p>
                </div>
              )}
            </Link>
            <div className="mt-4 flex w-full gap-x-4 text-sm">
              <button className="inline-flex w-full items-center justify-center gap-x-2 bg-cyan-500 py-2.5 text-center font-medium  text-white hover:bg-cyan-600">
                <ShoppingBagIcon className="h-4 w-4 stroke-2" /> Add to cart
              </button>
              <button className="group inline-flex w-full items-center justify-center gap-x-2 py-2.5  text-center font-medium text-gray-900 hover:bg-gray-100">
                <HeartIcon className="h-4 w-4 fill-white stroke-gray-900 stroke-2 group-hover:fill-red-500 group-hover:stroke-red-500" />{" "}
                Like
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscountedProducts;
