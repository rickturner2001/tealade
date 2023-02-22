import Head from "next/head";
import StoredProducts from "../../components/admin/storedProducts/StoredProducts";

const importList = () => {
  return (
    <>
      <Head>
        <title>Tealade | Admin Dashboard</title>
      </Head>
      <StoredProducts />;
    </>
  );
};

export default importList;
