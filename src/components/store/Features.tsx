import { FunnelIcon, TruckIcon, UsersIcon } from "@heroicons/react/24/outline";

const Features = () => {
  return (
    <section className="justfiy-around  mx-auto flex w-full max-w-7xl flex-col gap-y-4 gap-x-4  px-4  text-center lg:flex-row lg:px-0 lg:text-start ">
      <Feature
        text={
          "We carefully select only the best products for our store, ensuring you get the highest quality items every time."
        }
        title="Quality You Can Trust"
      >
        <FunnelIcon className="h-6 w-6" />
      </Feature>
      <Feature
        text={
          "We work with trusted shipping partners like UPS and FedEx to ensure your order is delivered quickly and in great condition."
        }
        title="Trusted Shipping Partners"
      >
        <TruckIcon className="h-6 w-6" />
      </Feature>{" "}
      <Feature
        text={
          "Our dedicated customer service team is always available to answer any questions and provide assistance, ensuring a seamless shopping experience."
        }
        title="Exceptional Customer Service"
      >
        <UsersIcon className="h-6 w-6" />
      </Feature>
    </section>
  );
};

const Feature = ({
  children,
  title,
  text,
}: {
  children: JSX.Element;
  title: string;
  text: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-x-4 gap-y-4   bg-teal-500 py-4 px-8 text-sm font-medium text-white lg:flex-row lg:items-center lg:justify-start">
      <div>{children}</div>
      <div className="flex flex-col gap-y-2">
        <p className="font-bold">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Features;
