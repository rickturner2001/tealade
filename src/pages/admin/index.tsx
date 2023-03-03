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
  Alert,
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isError } from "@tanstack/react-query";

const ImportedProducts = () => {
  const { data: registeredProducts } =
    api.products.getAllStoreProducts.useQuery();

  const [isError, setIsError] = useState(false);
  return (
    <AdminDashboardLayout
      breadCrumbs={[<BreadcrumbItem key={1}>Imported Products</BreadcrumbItem>]}
    >
      <>
        <Divider />

        {isError && (
          <Alert
            message="Error! Only admins can interact with products"
            onClose={() => setIsError(false)}
            type="error"
            closable
            className="my-12"
          />
        )}
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
              return (
                <ProductCardDisplay
                  key={prod.pid}
                  setIsError={setIsError}
                  product={prod}
                />
              );
            })}
          </Row>
        )}
      </>
    </AdminDashboardLayout>
  );
};

const ProductCardDisplay = ({
  setIsError,
  product,
}: {
  setIsError: Dispatch<SetStateAction<boolean>>;
  product: StoreProductIncludeAll;
}) => {
  const utils = api.useContext();

  const {
    mutate: moveProducstToEdits,
    isLoading: loadingProductEdit,
    isError: editsError,
  } = api.products.setProductToEdit.useMutation({
    onSuccess: async () => {
      await utils.products.invalidate();
    },
  });

  const {
    mutate: removeProduct,
    isLoading: loadingRemoval,
    isError,
  } = api.products.deleteProduct.useMutation({
    onSuccess: async () => {
      await utils.products.invalidate().catch((error) => console.error(error));
    },
  });

  useEffect(() => {
    if (isError || editsError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [isError, editsError, setIsError]);

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
        loadingProductEdit ? (
          <Spin />
        ) : (
          <EditOutlined
            onClick={() => moveProducstToEdits({ pid: product.pid })}
            key="edit"
          />
        ),
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
