import BuilderLayout from "./builder/BuilderLayout";
import DashboardPageWrapper from "../../components/admin/layouts/DashboardPageWrapper";

const Builder = () => {
  return (
    <DashboardPageWrapper>
      <div className="flex flex-col ">
        <BuilderLayout />
      </div>
    </DashboardPageWrapper>
  );
};

export default Builder;
