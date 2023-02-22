import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-24 bg-gray-900 p-4 md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link href={"/"} className="block text-2xl uppercase text-white">
          tealade
        </Link>
        <ul className="mb-6 flex flex-wrap items-center text-sm text-gray-400 sm:mb-0">
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
      <hr className="my-6 border border-gray-700 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-400 sm:text-center">
        ©{" "}
        <a href="https://tealade.com/" className="hover:underline">
          Tealade™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
