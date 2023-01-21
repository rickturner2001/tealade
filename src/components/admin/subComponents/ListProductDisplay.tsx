import { CjProduct, Language } from "../../../types";
import { api } from "../../../utils/api";

const ListProductDisplay = ({ language }: { language: Language }) => {
  const { data, isFetched } = api.cjApi.getListProducts.useQuery({});

  if (!data) {
    return <div>Loading</div>;
  }
  if ((data.data && data.data.list.length == 0) || data.data == undefined) {
    return <div>No Products</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-x-12 gap-y-12 py-6 px-12">
      {data.data.list.map((prod) => {
        return (
          <ProductCard
            category={prod.categoryName}
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
  language,
}: {
  image: string;
  name: string;
  category: string;
  price: number;
  language: Language;
}) => {
  return (
    <div className="flex max-w-3xl flex-col items-center justify-center space-y-8 rounded-2xl bg-white py-12 px-12 shadow-md">
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
    </div>
  );
};
export default ListProductDisplay;
