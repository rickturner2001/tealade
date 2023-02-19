import { useContext, useRef } from "react";
import sectionEditContext from "../../context/sectionEditContext";

const URLThumbnailImport = () => {
  const thumbnailUrl = useRef<HTMLInputElement>(null);

  const { setNewThumbnail, setIsEditingThumbnail } =
    useContext(sectionEditContext);

  return (
    <div className="mt-4 flex h-max w-full items-center space-x-4 ">
      <input
        type="text"
        id="first_name"
        className=" block w-1/2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder="https://www.yourimage.jpg"
        ref={thumbnailUrl}
      />
      <button
        onClick={() => {
          const thumbnailUrlValue = thumbnailUrl?.current?.value;
          if (thumbnailUrlValue) {
            setNewThumbnail(thumbnailUrlValue);
            thumbnailUrl.current.value = "";
            setIsEditingThumbnail(false);
          }
        }}
        type="button"
        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
      >
        Add thumbnail
      </button>
    </div>
  );
};

export default URLThumbnailImport;
