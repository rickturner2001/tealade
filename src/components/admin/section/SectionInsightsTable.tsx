import type { SectionDataWithProducts } from "../../../types";

const SectionInsightsTable = ({
  sectionData,
}: {
  sectionData: SectionDataWithProducts;
}) => {
  console.log(
    sectionData.products.map((prod) =>
      prod.variants.map((variant) => variant.price)
    )
  );

  const averagePrice =
    sectionData.products
      .map(
        (product) =>
          product.variants
            .map((variant) => variant.price)
            .reduce((a, b) => a + b, 0) / product.variants.length
      )
      .reduce((a, b) => a + b, 0) / sectionData.products.length;

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="w-full rounded-lg  text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Label
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white ">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
            >
              Total products
            </th>
            <td className="px-6 py-4">{sectionData.products.length}</td>
          </tr>
          <tr className="border-b bg-white ">
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
            >
              Avg price
            </th>
            <td className="px-6 py-4">{averagePrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SectionInsightsTable;
