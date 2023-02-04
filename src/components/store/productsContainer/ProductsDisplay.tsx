import {
  ArrowPathIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  QueueListIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import FiltersBar from "./FiltersBar";
import SideMenu from "../../admin/SideMenu";
import SidebarMenu from "./SidebarMenu";

const ProductsDisplay = () => {
  return (
    <section className="grid w-full grid-cols-4 text-sm uppercase">
      <FiltersBar />
      <SidebarMenu />
    </section>
  );
};

export default ProductsDisplay;
