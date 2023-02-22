import { useRouter } from "next/router";
import ListProductDisplay from "../../../components/admin/subComponents/ListProductDisplay";
import DashboardPageWrapper from "../../../components/admin/layouts/DashboardPageWrapper";

const ListingWrapper = ({
  pageNumber,
  category,
}: {
  children?: JSX.Element;
  title: string;
  pageNumber: number;
  category?: string;
}) => {
  return (
    <DashboardPageWrapper>
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

export default listByPageNumber;
