import ProductList from "@/components/ProductList";

const productPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const { category } = await searchParams;
  return (
    <div className="">
      <ProductList category={category} params="product" />
    </div>
  );
};

export default productPage;
