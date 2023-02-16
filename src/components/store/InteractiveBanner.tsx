import { useContext } from "react";
import productContext from "../context/productsContext";
import { ArrowDownIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";

const InteractiveBanner = () => {



  const { currency, setCurrency } = useContext(productContext)
  const { data, status } = useSession()

  const flipCurrency = () => {
    if (currency === "EUR") {
      setCurrency("USD")
    } else {
      setCurrency("EUR")
    }
  }


  return (
    <div className="w-screen py-2 px-6 bg-gray-800 text-sm  text-white flex  items-center justify-between">
      <div className="inline-flex items-center font-semibold">
        <button onClick={flipCurrency}
          className="hover:bg-white/10 p-2 rounded-md mr-2">
          <ArrowsRightLeftIcon className="w-5 h-5" />
        </button>
        {currency}</div>
      {status === "unauthenticated" ? <Link href={"/login"} className="inline-flex font-semibold">Sign in</Link> : 
      <span className="inline-flex items-center"><img src={data?.user?.image ?? ""} className="object-cover w-8 rounded-full"/>
        <span className="inline-block ml-2">{data?.user?.name ?? "Guest"}</span> 
       </span>}
    </div>
  );
};



export default InteractiveBanner;
