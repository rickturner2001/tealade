import { Divider, Col, Skeleton } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import AdminDashboardLayout from "../../components/admin/AdminDashboardLayout";
import { api } from "../../utils/api";
import { ProductWithTags, StoreProductIncludeAll } from "../../types";
import { useState } from "react";
import { match } from "assert";
import Tabs from "../../components/admin/importedProducts/Tabs";
import TabMenu from "../../components/admin/importedProducts/Tabs";

type ProductTabs = "general" | "variants" | "images";

// const importList = () => {
//   return <ImportList />;
// };

// export default importList;

const ImportList = () => {
  const { data: products } = api.products.getAllImportedProducts.useQuery();

  return (
    <AdminDashboardLayout
      breadCrumbs={[<BreadcrumbItem key={1}>Imported Products</BreadcrumbItem>]}
    >
      <>
        <Divider />

        {!products ? (
          <Col className="mx-auto max-w-7xl gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <Skeleton
                key={idx}
                avatar
                paragraph={{ rows: 2 }}
                className="w-full max-w-sm"
              />
            ))}
          </Col>
        ) : (
          <Col className="mx-auto max-w-7xl gap-8 space-y-8">
            {products.map((prod) => {
              return <TabMenu key={prod.pid} product={prod} />;
              //     return <ProductCardDisplay key={prod.pid} product={prod} />;
            })}
          </Col>
        )}
      </>
    </AdminDashboardLayout>
  );
};

// const ProductCardDisplay = ({ product }: { product: ProductWithTags }) => {
//   const [currentTab, setTab] = useState<ProductTabs>("general");
//   switch (currentTab) {
//     case "general":
//       return <GeneralProductTab />;

//     case "images":
//       return <ImagesProductTab />;

//     case "variants":
//       return <VariantsProductTab />;
//   }
// };

export default ImportList;
