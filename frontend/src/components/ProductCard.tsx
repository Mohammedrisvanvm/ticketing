"use client";

import Link from "next/link";
import { DemoProductType } from "./ProductList";
import Image from "next/image";

const ProductCard = ({ product }: { product: DemoProductType }) => {
  
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <Link href={`products/${product.id}`}>
        <div className="relative aspect-2/1">
          <Image
            src={product.image}
            alt="product image"
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* Product Details */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className=" font-medium">{product.name}</h1>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className=" font-medium">${product.price.toFixed(2)}</p>
          <button className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white  transition-all duration-300 flex items-center gap-2">
            <Image
              src="/shopping-cart-icon.png"
              alt="cart buttton"
              className=""
              width={16}
              height={16}
            />
            add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
