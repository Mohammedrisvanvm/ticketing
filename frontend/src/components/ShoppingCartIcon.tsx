import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShoppingCartIcon = () => {
  return (
    <Link href="/cart" className="relative">
      <Image
        src="/shopping-cart-icon.png"
        alt="shopping-cart"
        width={20}
        height={20}
        className="w-4 h-4 text-grey-600"
      />
      <span className="absolute -top-3 -right-3 bg-amber-400 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">0</span>
    </Link>
  );
};

export default ShoppingCartIcon;
