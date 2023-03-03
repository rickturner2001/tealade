import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import AdminDashboardLayout from "../../../components/admin/AdminDashboardLayout";
import {
  Alert,
  Button,
  Carousel,
  Divider,
  Empty,
  Image,
  Radio,
  Spin,
  Tabs,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ShippingItem } from "../../../types";

const { Text, Title } = Typography;

const ProductSpecifics = ({ pid }: { pid: string }) => {
  const { data: productData } = api.cjApi.requestProductByID.useQuery({ pid });

  const utils = api.useContext();

  const [economyShipment, setEconomyShipment] = useState(0);
  const [regularShipment, setRegularShipment] = useState(0);

  const [shipments, setShipments] = useState<ShippingItem[]>([]);

  const {
    mutate: registerProduct,
    isLoading,
    isError,
    isSuccess,
  } = api.products.registerProduct.useMutation({
    onSuccess: async () => {
      await utils.products.invalidate();
    },
  });

  if (!productData || !productData.data) {
    return <Empty className="mt-12" />;
  }
  const product = productData.data;

  return (
    <>
      {isError && (
        <Alert
          message="Error! only admins can register products"
          closable
          type="error"
        />
      )}
      <div className="mx-auto mt-12 flex w-full flex-col gap-8 md:max-w-7xl lg:flex-row">
        <Carousel autoplay className="mx-auto w-full max-w-md">
          {product.productImageSet.map((src) => {
            return (
              <Image
                src={src}
                key={src}
                className="w-full max-w-md object-cover"
              />
            );
          })}
        </Carousel>
        <div className="w-full bg-white p-4 ">
          <Title className="">{product.entryNameEn}</Title>
          <Text>{product.productNameEn}</Text>

          <Title level={5}>${product.sellPrice}</Title>

          <Divider />
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: "Economy Shipment",
                key: "1",
                children: (
                  <Radioshipment
                    setShipments={setShipments}
                    vid={product.variants[0].vid}
                    setter={setEconomyShipment}
                  />
                ),
              },
              {
                label: "Regular Shipment",
                key: "2",
                children: (
                  <Radioshipment
                    setShipments={setShipments}
                    vid={product.variants[0].vid}
                    setter={setRegularShipment}
                  />
                ),
              },
            ]}
          />
          <Divider />

          <Button
            loading={isLoading}
            onClick={() => {
              if (shipments.length) {
                registerProduct({
                  categoryId: product.categoryId,
                  categoryName: product.categoryName,
                  defaultThumbnail: product.productImageSet[0],
                  description: product.productNameEn,
                  name: product.entryNameEn,
                  imageSet: product.productImageSet,
                  pid: product.pid,
                  shipments: shipments.map((ship) => {
                    return {
                      courier: ship.logisticName,
                      est: ship.logisticAging,
                      price: ship.logisticPrice,
                    };
                  }),
                  variants: product.variants.map((variant) => {
                    return {
                      height: variant.variantHeight,
                      image: variant.variantImage,
                      name: variant.variantNameEn,
                      price: variant.variantSellPrice,
                      vid: variant.vid,
                      width: variant.variantWidth,
                    };
                  }),
                });
              }
            }}
            block
            type="primary"
            className={isSuccess ? "bg-green-600" : " bg-blue-500"}
          >
            {isSuccess ? "Success" : "Add to imports list"}
          </Button>
        </div>
      </div>
    </>
  );
};

const Radioshipment = ({
  vid,
  setter,
  setShipments,
}: {
  vid: string;
  setter: Dispatch<SetStateAction<number>>;
  setShipments: Dispatch<SetStateAction<ShippingItem[]>>;
}) => {
  const { data: shipmentData } = api.cjApi.requestShipmentByVid.useQuery({
    vid,
  });

  useEffect(() => {
    if (shipmentData && shipmentData.data) {
      setShipments(shipmentData.data);
    }
  }, [shipmentData, setShipments]);

  if (!shipmentData || !shipmentData?.data) {
    return <Spin />;
  }

  const shipments = shipmentData.data;

  return (
    <Radio.Group
      onChange={(e) => setter(+e.target.value)}
      options={shipments.map((ship) => {
        return { label: ship.logisticPrice, value: ship.logisticPrice };
      })}
    />
  );
};

const ProductSpecificsWrapper = () => {
  const router = useRouter();

  const { pid } = router.query;
  return (
    <AdminDashboardLayout
      breadCrumbs={[
        <BreadcrumbItem key={1}>Product information</BreadcrumbItem>,
      ]}
    >
      {!pid ? <Empty /> : <ProductSpecifics pid={pid as string} />}
    </AdminDashboardLayout>
  );
};

export default ProductSpecificsWrapper;
