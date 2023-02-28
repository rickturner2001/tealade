import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

const ImageView = ({
  children,
  isOpen,
  imageSet,
  setIsOpen,
}: {
  children: JSX.Element;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  imageSet: string[];
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % imageSet.length);
  };

  const handlePreviousImage = () => {
    const newIndex =
      currentImageIndex === 0 ? imageSet.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <>
      {children}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative  h-full w-max transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={handlePreviousImage}
                    className="absolute top-1/2 left-4 z-20 rounded-md bg-black/40 p-2"
                  >
                    <ChevronLeftIcon className="h-6 w-6 stroke-white opacity-50" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-4 z-20 rounded-md bg-black/40 p-2"
                  >
                    <ChevronRightIcon className="h-6 w-6  stroke-white opacity-50" />
                  </button>
                  <img
                    alt=""
                    className="z-10 mx-auto h-auto max-w-2xl rounded-md object-cover object-center"
                    src={imageSet[currentImageIndex] as string}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ImageView;
