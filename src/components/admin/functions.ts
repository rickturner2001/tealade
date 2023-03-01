export const evaluatePriceRange = (variants: number[]) => {
  if (variants.length === 1) {
    return Math.ceil(variants[0] as number);
  }
  const first = Math.ceil(variants[0] as number);
  const last = Math.ceil(variants[variants.length - 1] as number);

  if (first === last) {
    return first;
  }
  return `${first}-${last}`;
};

export const getProductDiscount = (
  price: string | number,
  discount: number
) => {
  if (typeof price === "number") {
    return Math.ceil((price * (100 - discount)) / 100);
  } else {
    const [startPrice, endPrice] = price.split("-");
    const discountedStartPrice = Math.ceil(
      (parseInt(startPrice as string) * (100 - discount)) / 100
    );
    const discountedEndPrice = Math.ceil(
      (parseInt(endPrice as string) * (100 - discount)) / 100
    );
    if (discountedEndPrice === discountedStartPrice) {
      return discountedStartPrice;
    }
    return `${discountedStartPrice}-${discountedEndPrice}`;
  }
};
