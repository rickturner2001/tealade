import { useState } from "react";
import type { StoreSections } from "../../types";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  
  
  
  const [selectedSection ,setSelectedSection] =  useState<StoreSections>("featured")

  return (
    <div className="relative w-screen">
    <nav className="flex justify-between font-medium py-4 px-10 items-center">
      <span className="inline-block text-2xl font-medium uppercase">Tealade</span>
    <ul className="flex  space-x-4">
      <li><button className="p-4 ">Featured</button></li>
      <li><button className="p-4">Seasonal</button></li>
      <li><button className="p-4">Hot</button></li>
    </ul>

<div className="flex space-x-6 items-center">

    {/* <input className="w-full rounded-md border focus:outline-none py-2 px-4"/> */}
<button>Search</button>
<Link href={"/"}>Help</Link>
<ShoppingBagIcon className="w-5 text-gray-600 h-5"/>
</div>

    </nav >
  <div className="w-[96%] mx-auto bottom-0  border-t border-t-gray-200"></div>
  
    </div>
  );
};

export default Navbar;
