import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const { category } = await searchParams;
  return (
    <div className="">
      <Banner />
      <ProductList category={category} />
    </div>
  );
};

export default Home;
