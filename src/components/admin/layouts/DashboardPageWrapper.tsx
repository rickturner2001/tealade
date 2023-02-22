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
      <Fragment>
        {!noContext && <ContextMenu />}
        {children}
      </Fragment>
    </Dashboard>
  );
};

const ContextMenu = () => {
  const { data: categories } = api.products.getAllCategories.useQuery();

  const [category, setCategory] = useState<Category | null>(null);

  return (
    <div className="flex w-full justify-end bg-gradient-to-r from-blue-700 to-blue-500/80 px-8 py-6 ">
      {categories && categories[0] && (
        <CategoryScrolldown
          categories={categories}
          defaultSelection={categories[0]}
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />
      )}
    </div>
  );
};

export default DashboardPageWrapper;
