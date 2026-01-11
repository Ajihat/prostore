import ProductList from "@/components/product/product-list";
import Newsletter from "@/components/newsletter";
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <Newsletter />
    </>
  );
};

export default HomePage;
