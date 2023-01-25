import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import Dashboard from "../../../components/admin/Dashboard";
import ListProductDisplay from "../../../components/admin/subComponents/ListProductDisplay";
import type { Language } from "../../../types";

const ListingWrapper = ({
  language,
  children,
  title,
  setLanguage,
  pageNumber,
}: {
  language: Language;
  children?: JSX.Element;
  title: string;
  setLanguage: Dispatch<SetStateAction<Language>>;
  pageNumber: number;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Dashboard
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      language={language}
      setLanguage={setLanguage}
      title={title}
    >
      <ListProductDisplay pageNumber={pageNumber} language={language} />
    </Dashboard>
  );
};

const ListByPageNumber = () => {
  const [languge, setLanguage] = useState<Language>("english");

  const router = useRouter();
  const { pageNumber } = router.query;

  return (
    <ListingWrapper
      setLanguage={setLanguage}
      language={languge}
      title={languge === "english" ? "Find products" : "Trova prodotti"}
      pageNumber={pageNumber ? +pageNumber : 1 ?? 1}
    />
  );
};

const listByPageNumber = () => {
  return <ListByPageNumber />;
};
export default listByPageNumber;
