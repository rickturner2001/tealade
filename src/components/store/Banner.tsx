const Banner = () => {
  return (
    <section className="relative z-20 flex flex-col items-center justify-center space-y-6  bg-blue-600 p-12 text-center text-white ">
      <h1 className="text-xl font-bold md:text-3xl">
        Unlock a World of Shopping, Start Today!
      </h1>
      <p className="text-sm md:text-base">
        Get a <span className="underline underline-offset-4">20% discount</span>{" "}
        on your first purchase with code{" "}
        <span className="font-bold">tealade2023</span> as a new user
      </p>
    </section>
  );
};

export default Banner;
