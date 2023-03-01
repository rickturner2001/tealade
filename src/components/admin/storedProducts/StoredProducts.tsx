import { LayoutGroup, motion } from "framer-motion";
import StoreProductGrid from "./StoredProductsGrid";
import DashboardPageWrapper from "../layouts/DashboardPageWrapper";

const StoredProducts = () => {
  return (
    <DashboardPageWrapper>
      <div className="flex flex-col ">
        <LayoutGroup>
          <motion.div layout className="px-0 py-12 md:px-6">
            <StoreProductGrid />
          </motion.div>
        </LayoutGroup>
      </div>
    </DashboardPageWrapper>
  );
};

export default StoredProducts;
