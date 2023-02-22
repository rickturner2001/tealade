import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-32 bg-cyan-500 p-4 px-4">
      <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row">
        <Link
          href={"/"}
          className="block px-5 py-2.5 text-2xl uppercase text-white hover:bg-white/20"
        >
          tealade
        </Link>
        <span className="block text-sm text-gray-100 sm:text-center">
          ©{" "}
          <a href="https://tealade.com/" className="hover:underline">
            Tealade™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-sm text-gray-100 sm:mb-0">
          <li>
            <Link
              href="/privacy-policy"
              className="mr-4 hover:underline md:mr-6"
            >
              Privacy Policy
            </Link>
          </li>

          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <Link href="/privacy-policy#contact-us" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
