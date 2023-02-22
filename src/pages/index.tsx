import type { NextPage } from "next";
import Navbar from "../components/store/Navbar";
import StoreContext from "../components/context/StoreContext";
import { useState } from "react";
import SectionsDisplay from "../components/store/SectionsDisplay";
import Banner from "../components/store/Banner";
import Features from "../components/store/Features";
import DiscountedProducts from "../components/store/DiscountedProducts";
import LatestProducts from "../components/store/LatestProducts";
import CTA from "../components/store/CTA";
import Footer from "../components/store/Footer";
import Head from "next/head";

const Home: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Tealade | Shop the Latest Fashion Trends Online</title>
      </Head>
      <StoreContext.Provider
        value={{
          isMenuOpen: isMenuOpen,
          setIsMenuOpen: setIsMenuOpen,
        }}
      >
        <Banner />
        <Navbar />
        <SectionsDisplay />
        <div className="mx-auto my-16 w-full max-w-7xl border-t border-t-gray-300"></div>
        <Features />

        <div className="mx-auto my-16 w-full max-w-7xl border-t border-t-gray-300"></div>
        <DiscountedProducts />

        <div className="mx-auto my-16 w-full max-w-7xl border-t border-t-gray-300"></div>
        <LatestProducts />

        <div className="mx-auto my-16 w-full max-w-7xl border-t border-t-gray-300"></div>
        <CTA />

        <Footer />
      </StoreContext.Provider>
    </>
  );
};

export default Home;
