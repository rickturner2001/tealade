import { useRouter } from "next/router";

import AdminDashboardLayout from "../../../components/admin/AdminDashboardLayout";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import {
  Card,
  Divider,
  Row,
  Skeleton,
  Image,
  Spin,
  Pagination,
  Space,
  Select,
} from "antd";
import { api } from "../../../utils/api";
import { useState } from "react";
import type { CjProduct } from "../../../types";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";

const ListingWrapper = ({
  pageNumber,
  category,
}: {
  children?: JSX.Element;
  title: string;
  pageNumber: number;
  category?: string;
}) => {
  const pageData = useState(40);

  const { data: registeredProducts } =
    api.products.getAllImportedProducts.useQuery();

  const { data: products } = api.cjApi.getListProducts.useQuery({
    pageNum: (pageNumber ? (+pageNumber as number | undefined) : 1) ?? 1,
    perPage: pageData[0],
    categoryKeyword: category ?? null,
  });

  const router = useRouter();
  return (
    <AdminDashboardLayout
      breadCrumbs={[<BreadcrumbItem key={1}>Imported Products</BreadcrumbItem>]}
    >
      <>
        <Divider />
        <Space className="w-full  justify-end" align="center">
          <CategoriesDropdown />
        </Space>

        <Divider />

        {!products || !products.data || !registeredProducts ? (
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
            {products.data.list.map((product) => {
              return (
                <ProductCard
                  product={product}
                  key={product.pid}
                  registeredPids={registeredProducts.map((prod) => prod.pid)}
                />
              );
            })}
          </Row>
        )}
        <Space className="w-full justify-center py-12" align="center">
          {products && (
            <Pagination
              pageSize={40}
              defaultCurrent={pageNumber}
              total={999}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onChange={(e) =>
                router.push(
                  `${
                    category
                      ? `/admin/find-products/${category}/${e}/`
                      : `/admin/find-products/${e}/`
                  }`
                )
              }
            />
          )}
        </Space>
      </>
    </AdminDashboardLayout>
  );
};

const CategoriesDropdown = () => {
  const { data: categories } = api.products.getAllCategories.useQuery();
  const router = useRouter();

  const { slugs } = router.query;

  const category = slugs
    ? slugs.length > 1
      ? slugs[0]
      : undefined
    : undefined;

  if (categories) {
    return (
      <Select
        className="w-full max-w-sm truncate overflow-ellipsis"
        defaultValue={
          category
            ? categories.filter((cat) => cat.cid === category)[0]?.label ??
              "Search by category"
            : "Search by category"
        }
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onChange={(e) => router.push(`/admin/find-products/${e}/1`)}
        options={categories.map((category) => {
          return { label: category.label, value: category.cid };
        })}
      />
    );
  }
  return <></>;
};

const ProductCard = ({
  product,
  registeredPids,
}: {
  product: CjProduct;
  registeredPids: string[];
}) => {
  const utils = api.useContext();

  const { mutate: blindProductListing, isLoading: loadingRegistration } =
    api.cjApi.blindProductRegistration.useMutation({
      onSuccess: async () => {
        await utils.products
          .invalidate()
          .catch((error) => console.error(error));
      },
    });

  const { mutate: removeProduct, isLoading: loadingRemoval } =
    api.products.deleteProduct.useMutation({
      onSuccess: async () => {
        await utils.products
          .invalidate()
          .catch((error) => console.error(error));
      },
    });

  return (
    <Card
      actions={[
        loadingRegistration || loadingRemoval ? (
          <Spin />
        ) : registeredPids.includes(product.pid) ? (
          <DeleteOutlined
            color="red"
            key="remove"
            onClick={() => removeProduct({ pid: product.pid })}
          />
        ) : (
          <PlusOutlined
            onClick={() => blindProductListing({ pid: product.pid })}
          />
        ),
      ]}
      className="w-full max-w-md md:max-w-xs"
      cover={<Image alt={product.productNameEn} src={product.productImage} />}
    >
      <Link href={`/admin/product/${product.pid}`}>
        <Meta title={product.productNameEn} className="text-center" />
        <p className="mt-2 text-center text-base font-medium">
          ${product.sellPrice}
        </p>
      </Link>
    </Card>
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
