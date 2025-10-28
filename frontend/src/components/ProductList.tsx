import Link from "next/link";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Filter from "./Filter";

export interface DemoProductType {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const demoProducts: DemoProductType[] = [
  {
    id: "prod_1",
    name: "Product 1",
    price: 29.99,
    description: "This is a great product.",
    image: "/banner-image.png",
  },
  {
    id: "prod_2",
    name: "Product 2",
    price: 49.99,
    description: "This is another great product.",
    image: "/banner-image.png",
  },
  {
    id: "prod_3",
    name: "Product 3",
    price: 19.99,
    description: "This product is affordable and useful.",
    image: "/banner-image.png",
  },
  {
    id: "prod_4",
    name: "Product 4",
    price: 99.99,
    description: "This is a premium product with extra features.",
    image: "/banner-image.png",
  },
];

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "product";
}) => {
  return (
    <div className="w-full">
      <Categories />
      {params === "product" && <Filter />}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {demoProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link href={category ? `/products?category=${category}` : "/products"}>
        <div className="flex justify-end mt-4 underline text-sm text-gray-500">
          View All Products
        </div>
      </Link>
    </div>
  );
};

export default ProductList;
