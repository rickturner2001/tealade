export const evaluatePriceRange = (variants: number[], shipment: number) => {
  if (variants.length === 1) {
    return variants[0] as number;
  }
  const first = variants[0] as number;
  const last = variants[variants.length - 1] as number;

  if (first === last) {
    return (first + shipment).toFixed(2);
  }
  return `${(first + shipment).toFixed(2)}-${(last + shipment).toFixed(2)}`;
};

export const getProductDiscount = (
  price: string | number,
  discount: number
) => {
  if (typeof price === "number") {
    return ((price * (100 - discount)) / 100).toFixed(2);
  } else {
    const [startPrice, endPrice] = price.split("-");
    const discountedStartPrice = (
      (parseInt(startPrice as string) * (100 - discount)) /
      100
    ).toFixed(2);
    const discountedEndPrice = (
      (parseInt(endPrice as string) * (100 - discount)) /
      100
    ).toFixed(2);
    if (!isNaN(+discountedEndPrice)) {
      return `${discountedStartPrice}-${discountedEndPrice}`;
    } else {
      return discountedStartPrice;
    }
  }
};
