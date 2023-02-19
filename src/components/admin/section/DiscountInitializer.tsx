import { useRef, useState } from "react";
import { SectionDataWithProducts } from "../../../types";
import { api } from "../../../utils/api";
import Spinner from "../../Spinner";
import OverrideDiscountModal from "./modals/OverrideDiscountModal";

const DiscountInitializer = ({
  sectionData,
}: {
  sectionData: SectionDataWithProducts;
}) => {
  const utils = api.useContext();
  const {
    mutate: issueSectionDiscountMutation,
    isLoading: loadingSessionDiscount,
    isSuccess: successfulSessionDiscount,
  } = api.discounts.issueSectionDiscount.useMutation({
    onSuccess: async () => {
      await utils.sections.invalidate();
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const discountValueRef = useRef<HTMLInputElement>(null);
  const discountLabelRef = useRef<HTMLInputElement>(null);

  const [isLabelError, setIsLabelError] = useState(false);
  const [isValueError, setIsValueError] = useState(false);

  const productsWithDiscount = sectionData.products.filter(
    (prod) => prod.discount
  );

  const handleSubmission = () => {
    const discountLabel = discountLabelRef?.current?.value;
    const discountValue = discountValueRef?.current?.value;

    if (!discountLabel) {
      setIsLabelError(true);
      return;
    } else if (!discountValue || isNaN(+discountValue)) {
      setIsValueError(true);
      return;
    } else {
      issueSectionDiscountMutation({
        label: discountLabel,
        value: +discountValue,
        pids: sectionData.products.map((prod) => prod.pid),
      });
      setIsLabelError(false);
      setIsValueError(false);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white text-gray-900 shadow ">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          Discount Initializer
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          Create a discount for a specific selection of products, as each
          discount applies to all products within that selection. Please note
          that{" "}
          <span className="font-bold underline">
            only one discount can be active at a time
          </span>
          .
        </p>
        <div className="flex flex-col gap-x-2 lg:flex-row">
          <div className="flex w-full flex-col py-4">
            <label htmlFor="discount-id " className="py-2 font-medium">
              Identifier
            </label>
            <input
              ref={discountLabelRef}
              type="text"
              id="discount-id"
              className="w-full rounded-lg border py-2.5 px-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="e.g. Summer Discount"
            />
          </div>
          <div className="flex w-full flex-col py-4">
            <label htmlFor="amount-id " className="py-2 font-medium">
              Discount (%)
            </label>
            <input
              ref={discountValueRef}
              type="text"
              id="amount-id"
              className="w-full rounded-lg border py-2.5 px-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="e.g. 20"
            />
          </div>
        </div>
        {loadingSessionDiscount ? (
          <button className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 py-3 text-center font-bold text-white">
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
            loading
          </button>
        ) : (
          <OverrideDiscountModal
            discountLabel={discountLabelRef?.current?.value}
            discountValue={discountValueRef?.current?.value}
            discountedProducts={productsWithDiscount}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          >
            <button
              onClick={() => {
                if (productsWithDiscount.length) {
                  setIsModalOpen(true);
                } else {
                  handleSubmission();
                }
              }}
              className="mt-2 w-full rounded-lg bg-gray-900 py-3 font-bold text-white"
            >
              Issue Discount
            </button>
          </OverrideDiscountModal>
        )}
      </div>
    </div>
  );
};

export default DiscountInitializer;
