import { Fragment, useState } from "react";
import Dashboard from "../Dashboard";
import type { SideMenuSection } from "../../../types";
import CategoryScrolldown from "../subComponents/dropdowns";
import { api } from "../../../utils/api";
import type { Category } from "@prisma/client";

const DashboardPageWrapper = ({
  children,
  noContext,
}: {
  children: JSX.Element;
  noContext?: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] =
    useState<SideMenuSection>("imported products");

  return (
    <Dashboard
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      title="Import list"
    >
      <Fragment>{children}</Fragment>
    </Dashboard>
  );
};

export const CategoriesScrolldownWrapper = () => {
  const { data: categories } = api.products.getAllCategories.useQuery();
  if (categories && categories[0])
    return <CategoryScrolldown categories={categories} />;
  return <></>;
};

export default DashboardPageWrapper;
