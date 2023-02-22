import { motion } from "framer-motion";
import { ShopSection } from "@prisma/client";
import { api } from "../../utils/api";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import SectionsContext from "../context/SectionsContext";
import Spinner from "../Spinner";

const SectionsDisplay = () => {
  const { data: sections } = api.sections.getAllSesctions.useQuery();

  const [selectedSection, setSelectedSection] = useState<ShopSection | null>(
    null
  );

  useEffect(() => {
    if (sections && sections[0] && selectedSection === null) {
      setSelectedSection(sections[0]);
    }
  }, [sections, selectedSection]);

  if (!sections) {
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
    <SectionsContext.Provider
      value={{
        selectedSection: selectedSection,
        setSelectedSection: setSelectedSection,
      }}
    >
      <section className="mx-auto mt-12 w-full max-w-7xl ">
        {sections && (
          <div className="flex h-full w-full flex-col space-y-6 ">
            <SectionsNav sections={sections} />
            <SectionDisplay sections={sections} />
          </div>
        )}
      </section>
    </SectionsContext.Provider>
  );
};

const SectionsNav = ({ sections }: { sections: ShopSection[] }) => {
  const { selectedSection, setSelectedSection } = useContext(SectionsContext);
  if (!selectedSection) {
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
    <ul className="flex items-center justify-center gap-x-2">
      {sections.map((section) => {
        return (
          <li
            onClick={() => setSelectedSection(section)}
            key={section.id}
            className={`cursor-pointer   py-2.5 px-5 font-medium transition-colors duration-200 ${
              selectedSection.id === section.id
                ? "bg-cyan-500 text-white"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            {section.label}
          </li>
        );
      })}
    </ul>
  );
};

const SectionDisplay = ({ sections }: { sections: ShopSection[] }) => {
  const { selectedSection } = useContext(SectionsContext);
  if (!selectedSection) {
    return <div></div>;
  }
  return (
    <div className="relative mx-auto flex h-[70vh] w-full max-w-7xl  ">
      {sections.map((section) => {
        return (
          <motion.div
            initial={
              selectedSection.id === section.id
                ? { zIndex: 10, opacity: "100", visibility: "visible" }
                : { zIndex: 2, opacity: "0", visibility: "hidden" }
            }
            animate={
              selectedSection.id === section.id
                ? { zIndex: 10, opacity: "100", visibility: "visible" }
                : { zIndex: 2, opacity: "0", visibility: "hidden" }
            }
            transition={{
              type: "spring",
              duration: 1,
            }}
            key={section.id}
            className="absolute top-0 right-0 mx-auto h-full w-full max-w-7xl flex-1   "
          >
            <div className="absolute top-0 right-0 flex h-full w-full items-center  bg-gradient-to-r from-black/80 p-12">
              <div className="w-full max-w-md">
                <span className="block text-4xl font-bold uppercase text-cyan-500">
                  {section.label}
                </span>
                <span className="block py-2 text-lg font-medium text-white">
                  {section.description}
                </span>
                <button className="focus:ouline-none mt-4  bg-cyan-500 py-2.5 px-5 text-white hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300">
                  View products
                </button>
              </div>
            </div>
            <img
              src={section.thumbnail}
              className="h-full w-full  object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default SectionsDisplay;
