import type { ProductVariant } from "@prisma/client";
import { motion } from "framer-motion";
import { type Dispatch, type SetStateAction, useRef } from "react";
import type { Language } from "../../../../types";

const SalesPriceMenu = ({
  isVisible,
  language,
  variants,
  setVariantPrices,
  id,
}: {
  variants: ProductVariant[];
  language: Language;
  isVisible: boolean;
  setVariantPrices: Dispatch<SetStateAction<number[]>>;
  id: string;
}) => {
  const setPercentProfit = (percentage: number) => {
    console.log("fired");
    setVariantPrices((prev) =>
      [...prev].map(
        (price, idx) =>
          (variants[idx]?.price as number) +
          (variants[idx]?.price as number) * (percentage / 100)
      )
    );
  };

  const profitRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      id={id}
      initial={{
        opacity: 0,
        zIndex: "-10",
        translateY: "100%",
      }}
      animate={
        isVisible
          ? {
              opacity: 1,
              zIndex: "10",
              translateY: "0%",
            }
          : {
              opacity: 0,

              zIndex: "-10",
              translateY: "100%",
            }
      }
      className="absolute -bottom-32 flex h-32 w-52 flex-col items-start rounded-lg border bg-white p-4 text-xs shadow-md"
    >
      <p className="font-medium ">
        {language === "english" ? "Set profit %" : "Imposta profitto %"}
      </p>
      <div className="mt-4 flex w-full justify-between">
        <input
          ref={profitRef}
          className="w-24 rounded-md bg-gray-100 p-3 text-gray-700 focus:outline-none"
          placeholder="e.g. 40"
          type={"number"}
        />
        <button
          onClick={() => {
            const currentValue = profitRef.current?.value;
            if (currentValue && !isNaN(+currentValue)) {
              setPercentProfit(+currentValue);
            }
          }}
          className="rounded-md bg-emerald-400 py-2 px-4 font-medium text-white"
        >
          {language === "english" ? "Apply" : "Applica"}
        </button>
      </div>
    </motion.div>
  );
};

export default SalesPriceMenu;
