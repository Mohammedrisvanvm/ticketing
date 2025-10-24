import Image from "next/image";
import React from "react";

const SearchBar = () => {
  return (
    <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 ring-1 ring-gray-200 shadow-md">
      <Image
        src="/search-icon.png"
        alt="search"
        width={20}
        height={20}
        className="w-4 h-4"
      />
      <input
        id="search"
        placeholder="Search..."
        className="text-sm outline-0"
      />
    </div>
  );
};

export default SearchBar;
