import Link from "next/link";
import type { StoreProductIncludeAll } from "../../../types";
import {
  ButtonNoBg,
  ButtonPrimary,
  ButtonSupportPrimary,
} from "../buttons/Buttons";
import { evaluatePriceRange, getProductDiscount } from "../functions";
import { api } from "../../../utils/api";
import Spinner from "../../Spinner";

interface AdminProductCardProps {
  product: StoreProductIncludeAll;
}

export const ImportedProductCard = ({ product }: AdminProductCardProps) => {
  const priceRange = evaluatePriceRange(
    product.variants.map((variant) => variant.price)
  );

  const discount = product.discount?.value;
  const price = discount
    ? getProductDiscount(priceRange, discount)
    : priceRange;

  const utils = api.useContext();

  const { mutate: removeProduct, isLoading: loadingRemoval } =
    api.products.deleteProduct.useMutation({
      onSuccess: async () => {
        await utils.products
          .invalidate()
          .catch((error) => console.error(error));
      },
    });

  const { mutate: setProductToEditMutation, isLoading: loadProductToEdit } =
    api.products.setProductToEdit.useMutation({
      onSuccess: async () => {
        await utils.products.invalidate();
      },
    });

  return (
    <div className=" flex w-full flex-col  bg-neutral-50  p-4 sm:max-w-xs  ">
      {/* Card Head */}
      <Link
        href={`/admin/imported-products/${product.pid}`}
        className="aspect-w-1 aspect-h-1  relative w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
      >
        <img
          alt={product.name}
          src={product.defaultThumbnail}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute top-0 right-0 flex w-full justify-end p-2">
          {discount && (
            <ButtonSupportPrimary
              label={discount.toString() + "%"}
              isLabel={true}
              additionalStyles="w-max h-max"
              textSize="xs"
              size="sm"
            />
          )}
        </div>
      </Link>
      {/* cardBody */}
      <div className="p-2">
        <div className="flex w-full flex-wrap  items-center justify-center  gap-x-1">
          {product.sections.map((section) => (
            <ButtonNoBg
              additionalStyles="text-secondary-800 font-semibold"
              size="sm"
              textSize="xs"
              key={section.id}
              label={section.label}
              href={`/producs/section/${section.label}`}
              isLight
            />
          ))}
        </div>

        <span className="mt-6 block px-2  text-center text-sm font-medium">
          {product.name}
        </span>
        <div className="flex items-center justify-center gap-x-4">
          <span className="block py-2 text-center font-medium">${price}</span>
        </div>
      </div>
      {/* Card Bottom */}
      <div className=" w-full p-4">
        <ButtonPrimary
          handler={() => setProductToEditMutation({ pid: product.pid })}
          label={loadProductToEdit ? "loading" : "Move to imported list"}
          additionalStyles="w-full"
        >
          {loadProductToEdit ? <Spinner className="mr-2 h-4 w-4" /> : undefined}
        </ButtonPrimary>
        <ButtonNoBg
          handler={() => removeProduct({ pid: product.pid })}
          label={loadingRemoval ? "loading" : "Remove product"}
          additionalStyles="w-full text-red-700"
        >
          {loadingRemoval ? <Spinner className="mr-2 h-4 w-4" /> : undefined}
        </ButtonNoBg>
      </div>
    </div>
  );
};
