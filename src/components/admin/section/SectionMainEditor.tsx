import { useContext, useRef } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { api } from "../../../utils/api";
import Spinner from "../../Spinner";
import sectionEditContext from "../../context/sectionEditContext";
import SectionInsightsTable from "./SectionInsightsTable";
import type { SectionDataWithProducts } from "../../../types";
import Image from "next/image";
import { ButtonPrimary, ButtonSupportSecondary } from "../buttons/Buttons";

const SectionMainEditor = ({
  sectionData,
}: {
  sectionData: SectionDataWithProducts;
}) => {
  const {
    newThumbnail,
    setIsEditingThumbnail,
    setIsAddingProducts,
    sectionId,
  } = useContext(sectionEditContext);

  const sectionLabelRef = useRef<HTMLInputElement>(null);
  const sectionDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const utils = api.useContext();
  const {
    mutate: changeSectionThumbnailMutation,
    isLoading,
    isError,
    isSuccess,
  } = api.sections.changeSectionNameAndThumbnail.useMutation({
    onSuccess: async () => {
      await utils.sections.invalidate();
    },
  });

  return (
    <div className="flex w-full flex-col gap-x-4 gap-y-4 lg:flex-row">
      <div className="flex w-full flex-col gap-x-4 lg:w-full lg:flex-row">
        <div className="q-full flex h-full ">
          <div className="group relative  mx-auto w-full max-w-md lg:mx-0">
            <img
              alt={sectionData.description}
              src={newThumbnail === "" ? sectionData.thumbnail : newThumbnail}
              className=" h-full w-full border object-cover shadow-sm "
            />

            <div
              onClick={() => setIsEditingThumbnail(true)}
              className="absolute
            top-0 right-0 flex h-full w-full cursor-pointer flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              <svg
                className="h-12 w-12 text-gray-200 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col justify-end lg:mt-0">
          <label
            htmlFor="section-label"
            className="mb-2 block p-2 text-sm font-medium text-gray-900 "
          >
            Section label
          </label>
          <input
            type="text"
            id="section-label"
            className="gray-300 block w-full border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
            defaultValue={sectionData.label}
            ref={sectionLabelRef}
          />
          <label
            htmlFor="section-label"
            className="mb-2 block p-2 text-sm font-medium text-gray-900 "
          >
            Section descirption
          </label>
          <textarea
            id="message"
            defaultValue={sectionData.description}
            ref={sectionDescriptionRef}
            rows={4}
            className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
          ></textarea>
          <div className="flex w-full  flex-col items-center space-y-6  ">
            <div className="flex  w-full flex-col items-center space-y-4 py-2 lg:items-start ">
              <div className="flex w-full flex-row gap-x-2 py-2">
                <ButtonSupportSecondary
                  handler={() => setIsAddingProducts(true)}
                  additionalStyles="w-full"
                  label="Add Products"
                  isLight
                />

                <ButtonPrimary
                  label="Save changes"
                  additionalStyles="w-full text-center"
                  isLight
                  handler={
                    isLoading
                      ? undefined
                      : () => {
                          console.log(newThumbnail);
                          changeSectionThumbnailMutation({
                            thumbnail: newThumbnail,
                            description:
                              sectionDescriptionRef?.current?.value ??
                              sectionData.description,

                            sid: sectionId,
                            label:
                              sectionLabelRef?.current?.value ??
                              sectionData.label,
                          });
                        }
                  }
                >
                  {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : undefined}
                </ButtonPrimary>
              </div>

              {isError && (
                <div
                  className="mb-4 flex border border-red-300 bg-red-50 p-4 text-sm text-red-800 "
                  role="alert"
                >
                  <InformationCircleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="sr-only">Error</span>
                  <div>
                    <span className="font-medium">Error!</span> Something went
                    wrong.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SectionInsightsTable sectionData={sectionData} />
    </div>
  );
};

export default SectionMainEditor;
