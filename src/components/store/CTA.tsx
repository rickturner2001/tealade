import { EnvelopeIcon } from "@heroicons/react/24/outline";

const CTA = () => {
  return (
    <section className="mx-auto w-full max-w-7xl items-center justify-center bg-indigo-500 px-6 py-12 text-center text-white lg:px-0">
      <h4 className="text-4xl font-bold">Join Our Mailing List</h4>
      <p className="mx-auto max-w-2xl py-4 text-sm lg:text-base">
        Be the first to know about our latest products and exclusive discounts
        by subscribing to our mailing list. Get updates straight to your inbox
        and never miss a deal again. Sign up now and receive a special discount
        on your next purchase!
      </p>
      <div className="mx-auto  mt-4 flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 lg:max-w-2xl lg:flex-row">
        <input
          type="text"
          placeholder="Enter your email address"
          className="w-full p-2 text-gray-700 focus:outline-none "
        />
        <button className="inline-flex w-full items-center justify-center gap-x-2 bg-teal-500 px-5 py-2.5 font-medium lg:w-max lg:justify-start">
          <EnvelopeIcon className="h-4 w-4 stroke-2" /> Subscribe
        </button>
      </div>
    </section>
  );
};

export default CTA;
