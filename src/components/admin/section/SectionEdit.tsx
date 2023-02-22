import { useState } from "react";
import { Tab } from "@headlessui/react";
import SectionMainEditor from "./SectionMainEditor";
import type { SectionDataWithProducts } from "../../../types";
import DiscountInitializer from "./DiscountInitializer";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SectionEdit = ({
  sectionData,
}: {
  sectionData: SectionDataWithProducts;
}) => {
  const [tabs] = useState({
    "Section Editor": null,
    "Discount Initializer": null,
  } as const);

  return (
    <div className=" mx-auto w-full max-w-7xl px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex w-full space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.keys(tabs).map((tab) => {
            if (tab === "Section Editor") {
              return (
                <Tab.Panel
                  key={tab}
                  className={classNames(
                    "flex gap-x-4 rounded-xl bg-white p-3",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <SectionMainEditor sectionData={sectionData} />
                </Tab.Panel>
              );
            } else {
              return (
                <Tab.Panel
                  key={tab}
                  className={classNames(
                    "flex gap-x-4 rounded-xl bg-white p-3",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <DiscountInitializer sectionData={sectionData} />
                </Tab.Panel>
              );
            }
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default SectionEdit;
