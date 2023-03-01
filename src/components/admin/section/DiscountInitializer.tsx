import { useRef, useState } from "react";
import type { SectionDataWithProducts } from "../../../types";
import { api } from "../../../utils/api";
import Spinner from "../../Spinner";
import OverrideDiscountModal from "./modals/OverrideDiscountModal";
import { ButtonNoBg } from "../buttons/Buttons";

const DiscountInitializer = ({
  sectionData,
}: {
  sectionData: SectionDataWithProducts;
}) => {
  const utils = api.useContext();
  const {
    mutate: issueSectionDiscountMutation,
    isLoading: loadingSessionDiscount,
  } = api.discounts.issueSectionDiscount.useMutation({
    onSuccess: async () => {
      await utils.sections.invalidate();
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const discountValueRef = useRef<HTMLInputElement>(null);
  const discountLabelRef = useRef<HTMLInputElement>(null);

  const labelState = useState(false);
  const valueState = useState(false);

  const productsWithDiscount = sectionData.products.filter(
    (prod) => prod.discount
  );

  const productsWithoutDiscount = sectionData.products.filter(
    (prod) => !prod.discount
  );

  const handleSubmission = () => {
    const discountLabel = discountLabelRef?.current?.value;
    const discountValue = discountValueRef?.current?.value;

    if (!discountLabel) {
      labelState[1](true);
      return;
    } else if (!discountValue || isNaN(+discountValue)) {
      valueState[1](true);
      return;
    } else {
      issueSectionDiscountMutation({
        label: discountLabel,
        value: +discountValue,
        pids: sectionData.products.map((prod) => prod.pid),
      });
      labelState[1](false);
      valueState[1](false);
    }
  };

  return (
    <div className="flex flex-col items-center border border-gray-200 bg-white text-gray-900 shadow ">
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
              className="w-full border py-2.5 px-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
              className="w-full border py-2.5 px-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="e.g. 20"
            />
          </div>
        </div>

        <OverrideDiscountModal
          discountLabel={discountLabelRef?.current?.value}
          discountValue={discountValueRef?.current?.value}
          discountedProducts={productsWithDiscount}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          undiscountedProducts={productsWithoutDiscount.map((prod) => prod.pid)}
        >
          <ButtonNoBg
            additionalStyles="w-full text-center bg-neutral-900 text-white"
            label={"Issue discount"}
            handler={
              loadingSessionDiscount
                ? undefined
                : () => {
                    if (productsWithDiscount.length) {
                      setIsModalOpen(true);
                    } else {
                      handleSubmission();
                    }
                  }
            }
          >
            {loadingSessionDiscount ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : undefined}
          </ButtonNoBg>
        </OverrideDiscountModal>
      </div>
    </div>
  );
};

export default DiscountInitializer;
