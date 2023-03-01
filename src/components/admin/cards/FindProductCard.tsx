import { Product } from "@prisma/client";
import { CjProduct } from "../../../types";
import { api } from "../../../utils/api";
import { ButtonPrimary, ButtonSupportPrimary } from "../buttons/Buttons";
import Spinner from "../../Spinner";
import Link from "next/link";

const FindProductCard = ({
  product,
  registeredProducts,
}: {
  product: CjProduct;
  registeredProducts: Product[];
}) => {
  const utils = api.useContext();
  const isListed = registeredProducts
    .map((prod) => prod.pid)
    .includes(product.pid);
  const { mutate: removeProduct, isLoading: loadingRemoval } =
    api.products.deleteProduct.useMutation({
      onSuccess: async () => {
        await utils.products
          .invalidate()
          .catch((error) => console.error(error));
      },
    });
  const { mutate: blindProductListing, isLoading: loadingRegistration } =
    api.cjApi.blindProductRegistration.useMutation({
      onSuccess: async () => {
        await utils.products
          .invalidate()
          .catch((error) => console.error(error));
      },
    });

  return (
    <div className=" flex w-full flex-col items-center justify-between bg-neutral-50  p-4 sm:max-w-xs  ">
      {/* Card Head */}
      <Link
        href={`/admin/product/${product.pid}`}
        className="aspect-w-1 aspect-h-1  relative w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
      >
        <img
          alt={product.productNameEn}
          src={product.productImage}
          className="h-full w-full object-cover object-center"
        />
      </Link>
      {/* cardBody */}
      <div className="p-2">
        <span className="mt-6 block px-2  text-center text-sm ">
          {product.productNameEn}
        </span>
        <div className="flex items-center justify-center gap-x-4">
          <span className="block py-2 text-center font-medium">
            ${product.sellPrice}
          </span>
        </div>
      </div>
      {/* Card Bottom */}
      <div className=" w-full p-4">
        {isListed ? (
          <ButtonSupportPrimary
            handler={() => removeProduct({ pid: product.pid })}
            label={loadingRemoval ? "loading" : "Remove product"}
            additionalStyles="w-full"
          >
            {loadingRemoval ? <Spinner className="mr-2 h-4 w-4" /> : undefined}
          </ButtonSupportPrimary>
        ) : (
          <ButtonPrimary
            handler={() => blindProductListing({ pid: product.pid })}
            label={loadingRegistration ? "loading" : "Add to imports"}
            additionalStyles="w-full"
          >
            {loadingRegistration ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : undefined}
          </ButtonPrimary>
        )}
      </div>
    </div>
  );
};

export default FindProductCard;
