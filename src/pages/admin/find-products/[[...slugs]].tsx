import { useRouter } from "next/router";
import { type Dispatch, type SetStateAction, useState } from "react";
import Dashboard from "../../../components/admin/Dashboard";
import ListProductDisplay from "../../../components/admin/subComponents/ListProductDisplay";
import type { Language } from "../../../types";
import { Category } from "@prisma/client";
import CategoryScrolldown from "../../../components/admin/subComponents/dropdowns";
import { api } from "../../../utils/api";

const ListingWrapper = ({
  language,
  title,
  setLanguage,
  pageNumber,
  category,
}: {
  language: Language;
  children?: JSX.Element;
  title: string;
  setLanguage: Dispatch<SetStateAction<Language>>;
  pageNumber: number;
  category?: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Dashboard
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      setLanguage={setLanguage}
      title={title}
    >
      <>
        <ContextMenu />
        <ListProductDisplay
          category={category}
          pageNumber={pageNumber}
          language={language}
        />
      </>
    </Dashboard>
  );
};

const ListByPageNumber = () => {
  const [languge, setLanguage] = useState<Language>("english");

  const router = useRouter();

  const { slugs } = router.query;

  return (
    <ListingWrapper
      setLanguage={setLanguage}
      language={languge}
      title={languge === "english" ? "Find products" : "Trova prodotti"}
      pageNumber={slugs ? (slugs[1] ? +slugs[1] : slugs[0] ? +slugs[0] : 1) : 1}
      category={slugs && slugs.length > 1 ? slugs[0] : undefined}
    />
  );
};

const listByPageNumber = () => {
  return <ListByPageNumber />;
};
const ContextMenu = () => {
  const { data } = api.products.getAllCategories.useQuery();
  const [category, setCategory] = useState<null | Category>(null);
  return (
    <div className=" flex w-full justify-end bg-gradient-to-r from-blue-700 to-blue-500/80 py-6">
      {data && (
        <CategoryScrolldown
          categories={data}
          defaultSelection={data[0] as Category}
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />
      )}
    </div>
  );
};

export default listByPageNumber;