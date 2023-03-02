// import Head from "next/head";
// import StoredProducts from "../../components/admin/storedProducts/StoredProducts";

// const importList = () => {
//   return (
//     <>
//       <Head>
//         <title>Tealade | Admin Dashboard</title>
//       </Head>
//       <StoredProducts />;
//     </>
//   );
// };

// export default importList;

import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import AdminDashboardLayout from "../../components/admin/AdminDashboardLayout";
import {
  Badge,
  Card,
  Col,
  Divider,
  Image,
  Row,
  Skeleton,
  Space,
  Spin,
  Statistic,
  Tag,
} from "antd";
import { api } from "../../utils/api";
import Meta from "antd/lib/card/Meta";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  evaluatePriceRange,
  getProductDiscount,
} from "../../components/admin/functions";
import type { StoreProductIncludeAll } from "../../types";

const ImportedProducts = () => {
  const { data: registeredProducts } =
    api.products.getAllStoreProducts.useQuery();
  return (
    <AdminDashboardLayout
      breadCrumbs={[<BreadcrumbItem key={1}>Imported Products</BreadcrumbItem>]}
    >
      <>
        <Divider />

        {!registeredProducts ? (
          <Row className="gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <Skeleton
                key={idx}
                avatar
                paragraph={{ rows: 2 }}
                className="w-full max-w-sm"
              />
            ))}
          </Row>
        ) : (
          <Row className="gap-8">
            {registeredProducts.map((prod) => {
              return <ProductCardDisplay key={prod.pid} product={prod} />;
            })}
          </Row>
        )}
      </>
    </AdminDashboardLayout>
  );
};

const ProductCardDisplay = ({
  product,
}: {
  product: StoreProductIncludeAll;
}) => {
  const utils = api.useContext();

  const { mutate: removeProduct, isLoading: loadingRemoval } =
    api.products.deleteProduct.useMutation({
      onSuccess: async () => {
        await utils.products
          .invalidate()
          .catch((error) => console.error(error));
      },
    });

  const priceRange = evaluatePriceRange(
    product.variants.map((variant) => variant.price)
  );
  const discount = product.discount?.value;
  const price = discount
    ? getProductDiscount(priceRange, discount)
    : priceRange;

  return (
    <Card
      actions={[
        <EditOutlined key="edit" />,
        loadingRemoval ? (
          <Spin />
        ) : (
          <DeleteOutlined
            onClick={() => removeProduct({ pid: product.pid })}
            key="remove"
          />
        ),
      ]}
      className="w-full max-w-md md:max-w-xs"
      cover={
        discount ? (
          <Badge count={discount.toString() + " %"}>
            <Image alt={product.name} src={product.defaultThumbnail} />
          </Badge>
        ) : (
          <Image alt={product.name} src={product.defaultThumbnail} />
        )
      }
    >
      <Space className="w-full justify-center pb-4" align="center" wrap>
        {product.sections.map((section) => {
          return (
            <Tag color="blue" key={section.id}>
              {section.label}
            </Tag>
          );
        })}
      </Space>

      <Meta title={product.name} className="text-center" />
      <p className="mt-2 text-center text-base font-medium">${price}</p>
    </Card>
  );
};

export default ImportedProducts;
