import { ProductTag } from "@prisma/client";
import { Button, Divider, Form, Image, Input, Select, Spin, Tag } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { api } from "../../../utils/api";
import { useContext } from "react";
import { ProductTabContext } from "./Tabs";

const GeneralProductTab = () => {
  const { data: sections } = api.sections.getAllSesctions.useQuery();

  const {
    product,
    setProductName,
    productName,
    setProductDescription,
    productSection,
    setSection,
    productDescription,
    defaultThumbnail,
    imagesSet,
    shipments,
    variants,
  } = useContext(ProductTabContext);

  const utils = api.useContext();
  const {
    mutate: registerProduct,
    isError: registrationError,
    isLoading: loadingRegistration,
  } = api.products.finalizeProductListing.useMutation({
    onSuccess: async () => {
      await utils.products.getAllImportedProducts.invalidate();
    },
  });

  return (
    <div className="flex w-full flex-col items-center gap-4 md:flex-row">
      <Image
        className="w-full max-w-xs"
        src={product.defaultThumbnail}
        alt={product.name}
      />
      <Form name="form_product" layout="vertical" className="w-full">
        <div className="flex w-full flex-col gap-3 lg:flex-row">
          <Form.Item
            label="Product name"
            name={"Product name"}
            className="w-full"
          >
            <Input
              defaultValue={product.name}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Item description" className="w-full">
            <TextArea
              onChange={(e) => setProductDescription(e.target.value)}
              defaultValue={product.description}
              className="w-full max-w-md"
            />
          </Form.Item>
        </div>
        <Divider />
        <Form.Item label="Tags" name={"Tags"}>
          <Input
            placeholder="Trendy"
            className=""
            onKeyDown={(e) => {
              if (e.key === "Enter") console.log("eh");
            }}
          />
        </Form.Item>
        <Form.Item label="Section">
          {sections ? (
            <Select
              defaultValue={productSection ?? "Select a section"}
              onChange={(e) => setSection(e)}
              options={sections.map((section) => {
                return { label: section.label, value: section.id };
              })}
            />
          ) : (
            <Spin />
          )}
        </Form.Item>

        <div className="flex w-full  flex-wrap">
          {product.tags.map((tag) => {
            return <Tag key={tag.label}>{tag.label}</Tag>;
          })}
        </div>
        <div className="flex flex-col justify-end gap-2 md:flex-row">
          <Button danger type="primary" className="w-full md:w-max">
            Remove product
          </Button>
          <Button
            type="primary"
            className=" w-full bg-blue-500 md:w-max"
            onClick={() => {
              registerProduct({
                description: productDescription,
                imageSet: imagesSet,
                name: productName,
                pid: product.pid,
                sectionId: productSection,
                variants: variants,
              });
            }}
          >
            Add to imports
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default GeneralProductTab;
