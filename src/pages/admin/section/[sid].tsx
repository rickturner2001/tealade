import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import Dashboard from "../../../components/admin/Dashboard";
import { ContextMenu } from "..";
import { useRef, useState } from "react";
import { Language } from "../../../types";
import { Product, ShopSection } from "@prisma/client";
import Spinner from "../../../components/Spinner";

const SectionView = () => {
  const router = useRouter();
  const { sid } = router.query;

  const { data: sectionData } = api.sections.getSectionById.useQuery({
    sid: sid as string,
  });

  const [language, setLanguage] = useState<Language>("english");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Dashboard
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      setLanguage={setLanguage}
      title={sectionData ? sectionData.label : "Section Edit"}
    >
      <SectionItems sectionData={sectionData} />
    </Dashboard>
  );
};

const SectionItems = ({
  sectionData,
}: {
  sectionData:
    | (ShopSection & {
        products: Product[];
      })
    | null
    | undefined;
}) => {
  const sectionLabelRef = useRef<HTMLInputElement>(null);

  if (!sectionData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-3 gap-x-4 bg-white p-4 text-sm md:grid-cols-4 2xl:grid-cols-5">
      <div className="col-span-2 flex flex-col border ">
        <div className="flex flex-col">
          <label htmlFor="sectionName" className="py-2 font-bold">
            Section Label
          </label>
          <input
            id="sectionName"
            defaultValue={sectionData.label}
            ref={sectionLabelRef}
            className="rounded-lg border py-2.5"
          />
        </div>
      </div>
      {sectionData.products.map((prod) => {
        return <ProductDisplay key={prod.pid} product={prod} />;
      })}
    </div>
  );
};

const ProductDisplay = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col items-center rounded-lg border p-6">
      <img
        src={product.defaultThumbnail}
        alt={product.name}
        className="h-44 w-44 rounded-lg object-cover"
      />
      <p className="tet-gray-700 py-2 font-medium">{product.name}</p>
    </div>
  );
};

export default SectionView;
