import { LayoutGroup, motion } from "framer-motion";
import { api } from "../../../utils/api";
import ProductTab from "./ProductTab";
import notFound from "../../../../public/media/images/not-found.png";
import Link from "next/link";
import DashboardPageWrapper from "../layouts/DashboardPageWrapper";
import Image from "next/image";

const ImportList = () => {
  const { data: importedProducts } =
    api.products.getAllImportedProducts.useQuery();

  return (
    <DashboardPageWrapper noContext={true}>
      <div className="flex flex-col ">
        {importedProducts && importedProducts.length > 0 ? (
          importedProducts.map((prod) => {
            return (
              <LayoutGroup key={prod.pid}>
                <motion.div
                  layout
                  key={prod.pid}
                  className="px-6 py-12 md:px-24"
                >
                  <div className="w-full rounded-xl bg-white shadow-lg">
                    <ProductTab product={prod} />
                  </div>
                </motion.div>
              </LayoutGroup>
            );
          })
        ) : (
          <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-24">
            <div className="relative h-96 w-96">
              <Image
                src={notFound.src}
                fill
                className=" mb-12 h-96 object-cover"
                alt="not found"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-center text-2xl font-bold">
                Could not find any products
              </p>
              <Link
                href={"/admin/find-products/1"}
                className="mt-4 w-full rounded-md bg-emerald-400 py-4 px-8 text-center text-sm font-bold text-white"
              >
                Find Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardPageWrapper>
  );
};

export default ImportList;
