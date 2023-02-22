import {
  CheckIcon,
  EyeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { api } from "../../../../utils/api";
import Spinner from "../../../Spinner";
import sectionEditContext from "../../../context/sectionEditContext";

const AddProductsAlert = () => {
  const { setIsAddingProducts, newProducts, sectionId } =
    useContext(sectionEditContext);

  const utils = api.useContext();

  const { mutate: addProductsMutation, isLoading } =
    api.sections.addProductsToSection.useMutation({
      onSuccess: async () => {
        await utils.sections.invalidate();
        setIsAddingProducts(false);
      },
    });

  return (
    <div
      id="alert-additional-content-1"
      className="col-span-full mb-4 w-full rounded-lg border-blue-500 bg-blue-100 p-4 text-blue-800"
      role="alert"
    >
      <div className="flex items-center">
        <InformationCircleIcon className="mr-2 h-5 w-5" />

        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">Product Selection Mode</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        You are now in product selection mode. You can add multiple products to
        your selection by clicking on each one. Once you have finished selecting
        products, click on the{" "}
        <span className="font-bold">Deactivate selection mode</span> button to
        exit product selection mode and view your final selection.
      </div>
      <div className="flex">
        <button
          type="button"
          onClick={() => setIsAddingProducts(false)}
          className="mr-2 inline-flex items-center rounded-lg bg-red-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          <EyeIcon className="-ml-0.5 mr-2 h-4 w-4 " />
          Exit selection mode
        </button>
        {isLoading ? (
          <button
            type="button"
            className="mr-2 inline-flex items-center rounded-lg bg-blue-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200 "
          >
            <Spinner className="-ml-0.5 mr-2 h-4 w-4  animate-spin" />
            loading
          </button>
        ) : (
          <button
            onClick={() => {
              addProductsMutation({ pids: newProducts, sid: sectionId });
            }}
            type="button"
            className="mr-2 inline-flex items-center rounded-lg bg-blue-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200 "
          >
            <CheckIcon className="-ml-0.5 mr-2 h-4 w-4 " />
            Confirm products
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProductsAlert;
