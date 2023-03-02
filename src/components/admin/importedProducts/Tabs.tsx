/* eslint-disable @typescript-eslint/no-empty-function */
import { Tabs } from "antd";
import { ProductWithTags } from "../../../types";
import GeneralProductTab from "./GeneralProductTab";
import VariantsProductTab from "./VariantsProductTab";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import ImagesProductTab from "./ImagesProductTab";

type Shipment = {
  courier: string;
  est: string;
  price: number;
};

type Variant = {
  vid: string;
  price: number;
  name: string;
  image: string;
  height: number;
  width: number;
};

interface ProductTabContextValue {
  product: ProductWithTags;
  productName: string;
  productDescription: string;
  productSection: string;
  defaultThumbnail: string;
  imagesSet: string[];
  shipments: Shipment[];
  variants: Variant[];
  setProductName: Dispatch<SetStateAction<string>>;
  setProductDescription: Dispatch<SetStateAction<string>>;
  setDefaultThumbnail: Dispatch<SetStateAction<string>>;
  setImagesSet: Dispatch<SetStateAction<string[]>>;
  setSection: Dispatch<SetStateAction<string>>;
  setShipments: Dispatch<SetStateAction<Shipment[]>>;
  setVariants: Dispatch<SetStateAction<Variant[]>>;
  setMargin: Dispatch<SetStateAction<number>>;
  margin: number;
}

export const ProductTabContext = createContext<ProductTabContextValue>({
  defaultThumbnail: "",
  imagesSet: [],
  product: {
    categoryId: "",
    defaultThumbnail: "",
    description: "",
    discountId: "",
    imageSet: [""],
    isImport: false,
    isStore: false,
    updatedAt: new Date(),
    name: "",
    pid: "",
    variants: [],
    shipments: [],
    tags: [],
  },
  productDescription: "",
  productName: "",
  productSection: "",
  shipments: [],
  margin: 0,
  setMargin: () => {},

  variants: [],
  setDefaultThumbnail: () => {},
  setImagesSet: () => {},
  setProductDescription: () => {},
  setProductName: () => {},
  setSection: () => {},
  setShipments: () => {},
  setVariants: () => {},
});

const TabMenu = ({ product }: { product: ProductWithTags }) => {
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [defaultThumbnail, setDefaultThumbnail] = useState(
    product.defaultThumbnail
  );
  const [imagesSet, setImagesSet] = useState(product.imageSet);
  const [variants, setVariants] = useState<Variant[]>(
    product.variants.map((variant) => {
      return {
        height: variant.height,
        image: variant.thumbnail,
        name: variant.variantName,
        price: variant.price,
        vid: variant.vid,
        width: variant.width,
      };
    })
  );

  const [margin, setMargin] = useState(0);

  const [productSection, setProductSection] = useState("");
  const [shipments, setShipments] = useState<Shipment[]>(
    product.shipments.map((ship) => {
      return { courier: ship.courier, est: ship.est, price: ship.cost };
    })
  );
  return (
    <ProductTabContext.Provider
      value={{
        defaultThumbnail: defaultThumbnail,
        setDefaultThumbnail: setDefaultThumbnail,
        imagesSet: imagesSet,
        setImagesSet: setImagesSet,
        product: product,
        productDescription: productDescription,
        productName: productName,
        productSection: productSection,
        setProductDescription: setProductDescription,
        setProductName: setProductName,
        setSection: setProductSection,
        setShipments: setShipments,
        setVariants: setVariants,
        shipments: shipments,
        margin: margin,
        setMargin: setMargin,
        variants: variants,
      }}
    >
      <Tabs
        className="w-full bg-white p-4"
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "information",
            children: <GeneralProductTab />,
          },
          {
            key: "2",
            label: "Variants",
            children: <VariantsProductTab />,
          },
          { key: "3", label: "Images", children: <ImagesProductTab /> },
        ]}
      />
    </ProductTabContext.Provider>
  );
};

export default TabMenu;
