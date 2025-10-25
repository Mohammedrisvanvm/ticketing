import Categories from "./Categories";
import ProductCard from "./ProductCard";

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

const ProductList = () => {
  return (
    <div className="w-full">
      <Categories />
    </div>
  );
};

export default ProductList;
