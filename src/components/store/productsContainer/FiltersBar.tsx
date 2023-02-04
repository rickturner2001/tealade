import {
  ArrowPathIcon,
  ChevronDownIcon,
  RectangleGroupIcon,
  QueueListIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const FiltersBar = () => {
  return (
    <>
      <div className="flex items-center justify-between border pl-12">
        <p className=" font-bold text-gray-800">filters</p>
        <button className="border-l  p-5 text-blue-500">
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex justify-between border p-5 text-sm uppercase">
        <p>
          sort by <span className="ml-2 font-bold">price desc</span>
        </p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <div className="flex justify-between border p-5 text-sm uppercase">
        <p>
          show (page) <span className="ml-2 font-bold">20</span>
        </p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <div className="flex w-full  border-b border-r">
        <div className="flex justify-between border  text-sm uppercase">
          <button className="  p-5">
            <RectangleGroupIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-between border  text-sm uppercase">
          <button className="p-5">
            <QueueListIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex w-full items-center  justify-center border  text-sm uppercase">
          info
          <button className="  p-5">
            <InformationCircleIcon className="h-5 w-5 stroke-blue-500" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersBar;
