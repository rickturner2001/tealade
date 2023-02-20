import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { ProductWithDiscount } from "../../../../types";
import { api } from "../../../../utils/api";
import Spinner from "../../../Spinner";

const OverrideDiscountModal = ({
  children,
  discountedProducts,
  isOpen,
  discountLabel,
  discountValue,
  undiscountedProducts,
  setIsOpen,
}: {
  children: JSX.Element;
  discountLabel: string | undefined;
  discountValue: string | undefined;
  discountedProducts: ProductWithDiscount[];
  undiscountedProducts: string[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [discountsToOverride, setDiscountsToOverride] = useState<string[]>([]);

  const utils = api.useContext();

  const {
    mutate: issueDiscountMutation,
    isLoading,
    isError,
  } = api.discounts.issueSectionDiscount.useMutation({
    onSuccess: async () => {
      await utils.sections.invalidate();
      setIsOpen(false);
    },
  });

  return (
    <>
      {children}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Discounts Applied in Current Section
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This is to notify our admin users that discounts have been
                      applied to certain products in the current section of our
                      store. When issuing new discounts, please refer to the
                      list of discounted products to ensure that the new
                      discounts do not override or cancel the existing ones.
                      Thank you for your attention to this matter.
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="mb-4 flex w-full items-center gap-x-4">
                      <h3 className="font-semibold text-gray-900 ">
                        Select discounts to override
                      </h3>

                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                        onClick={() =>
                          setDiscountsToOverride(
                            discountedProducts.map((product) => product.pid)
                          )
                        }
                      >
                        select all
                      </button>
                    </div>
                    <ul className="flex w-full flex-wrap rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 ">
                      {discountedProducts.map((prod) => {
                        return (
                          <li
                            key={prod.pid}
                            className="w-max rounded-t-lg border-b border-gray-200 "
                          >
                            <div className="flex items-center pl-3">
                              <input
                                id={prod.pid}
                                type="checkbox"
                                value=""
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                                onChange={() => {
                                  if (discountsToOverride.includes(prod.pid)) {
                                    setDiscountsToOverride((prev) =>
                                      prev.filter((pid) => pid !== prod.pid)
                                    );
                                  } else {
                                    setDiscountsToOverride((prev) => [
                                      ...prev,
                                      prod.pid,
                                    ]);
                                  }
                                }}
                                checked={discountsToOverride.includes(prod.pid)}
                              />
                              <div className="ml-2 flex  py-3">
                                <label
                                  htmlFor={prod.pid}
                                  className=" w-full  text-sm font-medium text-gray-900 "
                                >
                                  {prod.name}
                                </label>
                                <span className="ml-2 block text-sm font-bold">
                                  ({prod.discount?.value}%)
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="mt-4 flex w-full justify-between">
                    {isLoading ? (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                        <Spinner className="mr-2 h-4 w-4 animate-spin" />
                        loading
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          if (
                            discountLabel &&
                            discountValue &&
                            !isNaN(+discountValue)
                          ) {
                            issueDiscountMutation({
                              label: discountLabel,
                              value: +discountValue,
                              pids: [
                                ...undiscountedProducts,
                                ...discountsToOverride,
                              ],
                            });
                          }
                        }}
                      >
                        Override discounts
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Dismiss
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OverrideDiscountModal;
