import { EyeIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import sectionEditContext from "../../../context/sectionEditContext";
import URLThumbnailImport from "../URLThumbnailImport";

const ThumbnailEditAlert = () => {
  const { setIsEditingThumbnail } = useContext(sectionEditContext);
  return (
    <>
      <div
        id="alert-additional-content-1"
        className=" mx-auto mb-4 h-max w-full max-w-7xl  rounded-lg border-blue-500 bg-blue-100 p-4 text-blue-800 "
        role="alert"
      >
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">Thumbnail Selection Mode</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          You are now in thumbnail selection mode. Please select a product from
          the shop below to use as your thumbnail.
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={() => setIsEditingThumbnail(false)}
            className="mr-2 inline-flex items-center rounded-lg bg-red-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            <EyeIcon className="-ml-0.5 mr-2 h-4 w-4 " />
            Quit Thumbnail Selection
          </button>
        </div>
      </div>
      <div className="mx-auto mb-6 flex h-max w-full max-w-7xl flex-col rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 text-white">
        <p className="font-medium">
          You can also load a thumbnail via a URL endpoint that point that links
          to an image. Make sure the endpoint ends with one of the following
          file extensions: JPG, JPEG, WEBP, or SVG.
        </p>
        <URLThumbnailImport />
      </div>
    </>
  );
};

export default ThumbnailEditAlert;
