import primaryImage from "../../../../public/media/images/speaker.png";
import secondaryImage from "../../../../public/media/images/phone-cover.png";

import Image from "next/image";

const Hero = () => {
  return (
    <header className="flex w-full  text-white">
      <div className="flex w-[60%] items-center bg-gradient-to-r from-sky-600 to-sky-500 px-12">
        <div className="flex w-full max-w-2xl flex-col">
          <button className="text-bold mb-12 w-max rounded-md bg-gray-800 p-2 text-xs font-medium">
            featured
          </button>
          <h3 className="mb-4 font-medium uppercase">sponsored products</h3>
          <h2 className="text-2xl font-bold">Unlock a World of Shopping!</h2>
          <button className="mt-12 w-max rounded-full border border-sky-500/10 bg-sky-500/20 py-4 px-12 font-medium shadow-md">
            More info
          </button>
        </div>
        <Image
          src={primaryImage.src}
          alt="black speaker"
          className="w-full "
          width={primaryImage.width}
          height={primaryImage.height}
        />
      </div>

      <div className="flex w-[40%] items-center bg-gradient-to-br from-indigo-600 to-indigo-500 px-12">
        <div className="flex w-full max-w-7xl flex-col">
          <button className="text-bold mb-12 w-max rounded-md bg-gray-800 p-2 text-xs font-medium">
            featured
          </button>
          <h3 className="mb-6 font-medium uppercase">Seasonal collection</h3>
          <h2 className="text-2xl font-bold">
            Bring Home the Joy of the Season
          </h2>
          <button className="mt-12 w-max rounded-full border border-sky-500/10 bg-sky-500/20 py-4 px-12 font-medium shadow-md">
            More info
          </button>
        </div>
        <Image
          src={secondaryImage.src}
          alt="green sweatshirt"
          className="w-full "
          width={secondaryImage.width}
          height={secondaryImage.height}
        />
      </div>
    </header>
  );
};

export default Hero;
