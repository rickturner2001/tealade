import { CjProduct, Language } from "../../../types";
import { api } from "../../../utils/api";
import { motion } from "framer-motion";
import { useState } from "react";

const ListProductDisplay = ({ language }: { language: Language }) => {
  const { data, isFetched } = api.cjApi.getListProducts.useQuery({});

  if (!data) {
    return <div>Loading</div>;
  }
  if ((data.data && data.data.list.length == 0) || data.data == undefined) {
    return <div>No Products</div>;
  }

  return (
    <div className="lg-grid-cols-3 grid grid-cols-1 gap-x-12 gap-y-12  py-6 px-12 md:grid-cols-2 xl:grid-cols-4">
      {data.data.list.map((prod) => {
        return (
          <ProductCard
            category={prod.categoryName}
            pid={prod.pid}
            image={prod.productImage}
            language={language}
            name={prod.productNameEn}
            price={prod.sellPrice}
          />
        );
      })}
    </div>
  );
};

const ProductCard = ({
  image,
  category,
  name,
  price,
  pid,
  language,
}: {
  image: string;
  pid: string;
  name: string;
  category: string;
  price: number;
  language: Language;
}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  return (
    <motion.a
      href={`/admin/product/${pid}`}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsButtonVisible(true)}
      onHoverEnd={() => setIsButtonVisible(false)}
      transition={{ type: "tween", duration: 0.25 }}
      className="relative flex max-w-lg cursor-pointer flex-col items-center justify-center space-y-8 rounded-2xl bg-white py-12 px-12 shadow-md"
    >
      <div className="flex items-center justify-center">
        <img src={image} className="h-48 object-contain" />
      </div>
      <div className="flex w-full  flex-col items-center justify-center space-y-1 text-center">
        <p className="w-full overflow-hidden truncate text-ellipsis text-sm font-semibold text-gray-800">
          {name}
        </p>
        <p className="text-xs text-gray-700">{category}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold ">${price}</p>
        <p className="font-semibole text-sm">
          {language === "english" ? "Product Cost" : "Costo del prodotto"}
        </p>
      </div>
      <motion.button
        animate={isButtonVisible ? { opacity: 1 } : { opacity: 0 }}
        className="absolute -bottom-5 left-0 w-full rounded-b-xl bg-emerald-400  py-4 px-5 text-sm font-semibold text-white"
      >
        Add to import list
      </motion.button>
    </motion.a>
  );
};
export default ListProductDisplay;
