import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { useContext, useState } from "react";
import type { SectionDataWithProducts } from "../../../types";
import Spinner from "../../../components/Spinner";
import sectionEditContext from "../../../components/context/sectionEditContext";
import AddProductsDisplay from "../../../components/admin/section/AddProductsDisplay";
import SectionProductDisplay from "../../../components/admin/section/SectionProductsDisplay";
import ThumbnailEditAlert from "../../../components/admin/section/alerts/ThumbnailEditAlert";
import SectionEdit from "../../../components/admin/section/SectionEdit";
import DashboardPageWrapper from "../../../components/admin/layouts/DashboardPageWrapper";

export const evaluatePriceRange = (variants: number[]) => {
  if (variants.length === 1) {
    return variants[0] as number;
  }
  const first = variants[0] as number;
  const last = variants[variants.length - 1] as number;

  if (first === last) {
    return first;
  }
  return `${first}-${last}`;
};

export const getProductDiscount = (
  price: string | number,
  discount: number
) => {
  if (typeof price === "number") {
    return ((price * (100 - discount)) / 100).toFixed(2);
  } else {
    const [startPrice, endPrice] = price.split("-");
    const discountedStartPrice = (
      (parseInt(startPrice as string) * (100 - discount)) /
      100
    ).toFixed(2);
    const discountedEndPrice = (
      (parseInt(endPrice as string) * (100 - discount)) /
      100
    ).toFixed(2);
    return `${discountedStartPrice}-${discountedEndPrice}`;
  }
};

const SectionViewWrapper = () => {
  const router = useRouter();
  const { sid } = router.query;

  if (!sid) {
    return (
      <div className="h-full w-full items-center justify-center">
        <Spinner className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return <SectionView sid={sid as string} />;
};

const SectionView = ({ sid }: { sid: string }) => {
  const { data: sectionData } = api.sections.getSectionById.useQuery({
    sid: sid,
  });

  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false);
  const [newThumbnail, setNewThumbnail] = useState("");

  const [isAddingProducts, setIsAddingProducts] = useState(false);
  const [newProducts, setNewProducts] = useState<string[]>([]);

  return (
    <sectionEditContext.Provider
      value={{
        isAddingProducts: isAddingProducts,
        sectionId: sid,
        newProducts: newProducts,
        setIsAddingProducts: setIsAddingProducts,
        setNewProducts: setNewProducts,
        isEditingThumbnail: isEditingThumbnail,
        setIsEditingThumbnail: setIsEditingThumbnail,
        newThumbnail: newThumbnail,
        setNewThumbnail: setNewThumbnail,
      }}
    >
      <DashboardPageWrapper>
        <MainContainer sectionData={sectionData} />
      </DashboardPageWrapper>
    </sectionEditContext.Provider>
  );
};

const MainContainer = ({
  sectionData,
}: {
  sectionData: SectionDataWithProducts | null | undefined;
}) => {
  const { isAddingProducts, isEditingThumbnail } =
    useContext(sectionEditContext);

  if (!sectionData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  return (
    <div className=" gap    flex w-full flex-col gap-y-4 bg-gradient-to-b from-sky-400 to-sky-200 p-4  text-sm">
      {!isAddingProducts && !isEditingThumbnail && (
        <SectionEdit sectionData={sectionData} />
      )}
      {isAddingProducts ? (
        <AddProductsDisplay
          existingPids={sectionData.products.map((prod) => prod.pid)}
        />
      ) : (
        <>
          {isEditingThumbnail && <ThumbnailEditAlert />}
          <SectionProductDisplay sectionData={sectionData} />{" "}
        </>
      )}
    </div>
  );
};

export default SectionViewWrapper;
