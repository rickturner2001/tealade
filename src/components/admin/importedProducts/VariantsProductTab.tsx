import { useContext, useState } from "react";
import { ProductTabContext } from "./Tabs";
import { Card, Col, Form, Image, InputNumber, Table } from "antd";
import Meta from "antd/lib/card/Meta";
import { PrismaClientExtensionError } from "@prisma/client/runtime";

const columns: { title: string; dataIndex: string; key: string }[] = [
  { title: "", dataIndex: "thumbnail", key: "1" },
  { title: "Name", dataIndex: "name", key: "2" },
  { title: "Price", dataIndex: "price", key: "3" },
];

const VariantsProductTab = () => {
  const [isMarginError, setIsMarginError] = useState(false);
  const [marginValue, setMarginValue] = useState(0);
  const { variants } = useContext(ProductTabContext);

  const dataSource = variants.map((variant, idx) => {
    const price = marginValue
      ? (variant.price * marginValue) / 100 + variant.price
      : variant.price;

    return {
      key: idx,
      thumbnail: (
        <Image src={variant.image} height={50} className="h-12 w-12" />
      ),
      name: variant.name,
      price: price.toFixed(2),
    };
  });
  return (
    <>
      <div className="hidden md:block">
        <Form.Item label="Margin (%)" className="w-full md:ml-auto md:max-w-sm">
          <InputNumber
            className="w-full"
            placeholder="e.g. 40"
            status={isMarginError ? "error" : ""}
            onChange={(e) => {
              console.log(e);
              if (!e) {
                setMarginValue(0);
                setIsMarginError(true);
              } else {
                setIsMarginError(false);
                setMarginValue(e as number);
              }
            }}
          />
        </Form.Item>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
      <div className="block md:hidden">
        <Col className="space-y-6">
          {variants.map((variant) => {
            const price = marginValue
              ? (variant.price * marginValue) / 100 + variant.price
              : variant.price;
            return (
              <Card
                className="mx-auto w-full max-w-xs"
                key={variant.vid}
                cover={<img alt="example" src={variant.image} />}
              >
                <Meta
                  title={variant.name}
                  description={"$" + price.toFixed(2)}
                />
              </Card>
            );
          })}
        </Col>
      </div>
    </>
  );
};

export default VariantsProductTab;
