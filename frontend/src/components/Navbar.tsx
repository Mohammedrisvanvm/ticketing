import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-300 pb-4">
      {/* left */}
      <Link href="/" className="flex items-center gap-1">
        {" "}
        <Image
          src="/ticketing-logo.png"
          alt="need to update"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md-h-9"
        />
        <p className="hidden md:block text-md font-medium capitalize">
          Ticketing
        </p>
      </Link>

      {/* right */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Image
            src="/home-icon.png"
            alt="home"
            width={20}
            height={20}
            className="w-4 h-4 text-grey-600"
          />
        </Link>
        <Image
          src="/bell-icon.png"
          alt="bell"
          width={20}
          height={20}
          className="w-4 h-4 text-grey-600"
        />
        <Image
          src="/shopping-cart-icon.png"
          alt="shopping-cart"
          width={20}
          height={20}
          className="w-4 h-4 text-grey-600"
        />

        <Link href="/login">sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
