import { useState } from "react";
import { api } from "../../utils/api";
import Spinner from "../../components/Spinner";
import { type Discount, type Product, type Prisma } from "@prisma/client";
import Link from "next/link";
import DiscountDeletionModal from "../../components/admin/discount/modals/DiscountDeletionModal";
import DashboardPageWrapper from "../../components/admin/layouts/DashboardPageWrapper";

const Discounts = () => {
  const { data: discounts } = api.discounts.getAllDiscounts.useQuery();
  return (
    <DashboardPageWrapper noContext={true}>
      {discounts ? (
        <DiscountsDisplay discountsData={discounts} />
      ) : (
        <LoadingState />
      )}
    </DashboardPageWrapper>
  );
};

const LoadingState = () => {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center bg-white ">
      <Spinner className="h-5 w-5 animate-spin" />
    </div>
  );
};

const DiscountsDisplay = ({
  discountsData,
}: {
  discountsData: (Discount & {
    products: (Product & {
      _count: Prisma.ProductCountOutputType;
    })[];
  })[];
}) => {
  return (
    <div className="mx-auto my-12 flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-4 rounded-md  bg-gradient-to-r from-blue-500 to-blue-600 py-12 shadow-sm">
      {discountsData.map((discount) => {
        return <DiscountComponent key={discount.id} discount={discount} />;
      })}
    </div>
  );
};

const DiscountComponent = ({
  discount,
}: {
  discount: Discount & {
    products: (Product & {
      _count: Prisma.ProductCountOutputType;
    })[];
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="w-full rounded-md bg-white p-1 lg:min-w-[20rem]">
        <div className="rounded-md p-2 text-gray-900">
          <p className="font-bold">{discount.label}</p>
          <div className="flex justify-between p-2">
            <div className="flex  gap-x-2 text-sm">
              <p>Discount</p>
              <p className="font-semibold">{discount.value}%</p>
            </div>
            <div className="flex gap-x-2 text-sm">
              <p>Products</p>
              <p className="font-semibold">{discount.products.length}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-x-2">
            <Link
              href={`/admin/discount/${discount.id}`}
              className="block w-full  rounded-lg bg-gray-100 py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300"
            >
              Visit
            </Link>
            <DiscountDeletionModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              did={discount.id}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-lg bg-red-100 py-2 px-4 text-sm font-medium text-red-900 hover:bg-red-200 focus:ring-4 focus:ring-red-300"
              >
                Delete
              </button>
            </DiscountDeletionModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
