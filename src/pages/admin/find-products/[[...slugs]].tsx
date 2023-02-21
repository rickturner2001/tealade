import { useRouter } from "next/router";
import ListProductDisplay from "../../../components/admin/subComponents/ListProductDisplay";
import type { Category } from "@prisma/client";
import CategoryScrolldown from "../../../components/admin/subComponents/dropdowns";
import { api } from "../../../utils/api";
import DashboardPageWrapper from "../../../components/admin/layouts/DashboardPageWrapper";
import { useState } from "react";

const ListingWrapper = ({
  title,
  pageNumber,
  category,
}: {
  children?: JSX.Element;
  title: string;
  pageNumber: number;
  category?: string;
}) => {
  return (
    <DashboardPageWrapper noContext={true}>
      <ListProductDisplay category={category} pageNumber={pageNumber} />
    </DashboardPageWrapper>
  );
};

const ListByPageNumber = () => {
  const router = useRouter();

  const { slugs } = router.query;

  return (
    <ListingWrapper
      title="Find products"
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
