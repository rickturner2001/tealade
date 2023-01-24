import { Dispatch, SetStateAction, useEffect } from "react";
import { ProductWithTags } from "../../../../types";
import QuillEditor from "../../QullEditor";

const ProductDescription = ({
  product,
  productDescription,
  setProductDescription,
}: {
  productDescription: string;
  setProductDescription: Dispatch<SetStateAction<string>>;
  product: ProductWithTags;
}) => {
  useEffect(() => {
    if (!productDescription)
      setProductDescription(product.description.replace(/<img[^>]*>/g, ""));
  }, []);

  return (
    <div className="w-full p-12">
      <QuillEditor
        onChange={(value: string) => setProductDescription(value)}
        value={productDescription}
      />
    </div>
  );
};

export default ProductDescription;
