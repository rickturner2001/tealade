import { useState } from "react";
import type { Category } from "@prisma/client";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function CategoryScrolldown({
  categories,
}: {
  categories: Category[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative  w-full md:w-1/2 lg:w-1/3">
      <button
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
        }}
        id="dropdownDelayButton"
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        className="inline-flex w-full items-center justify-between truncate  overflow-ellipsis  bg-white p-4 px-4 py-2.5 text-center text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 "
        type="button"
      >
        Filter by category
        <ChevronDownIcon className="ml-2 h-4 w-4" />
      </button>
      <div
        id="dropdownDelay"
        className={`z-10 ${
          !isMenuOpen ? "hidden" : ""
        } absolute top-16 right-4 z-[100] h-96  w-full divide-y divide-gray-100 overflow-y-auto  bg-white p-4 shadow `}
      >
        <ul
          className="py-2 text-sm text-gray-700 "
          aria-labelledby="dropdownDelayButton"
        >
          {categories.map((category) => {
            return (
              <li key={category.cid} className="">
                <Link
                  className="block px-4 py-2 hover:bg-gray-100 "
                  href={`/admin/find-products/${category.cid}/1`}
                >
                  {category.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
