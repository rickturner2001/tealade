import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full bg-black p-4 text-center text-xs font-medium text-white lg:text-sm">
      Discover amazing discounts on high-quality products. Browse our{" "}
      <Link
        href={"/section/discounted"}
        className="font-bold underline underline-offset-2"
      >
        discounted selection
      </Link>{" "}
      and save big on your favorite items.
    </div>
  );
};

export default Banner;
