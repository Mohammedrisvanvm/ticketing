"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryType {
  name: string;
  icon: string;
  slug: string;
}
const Categories = () => {
  const categories: CategoryType[] = [
    {
      name: "All",
      icon: "/bell-icon.png",
      slug: "All",
    },
    {
      name: "Music",
      icon: "/bell-icon.png",
      slug: "Music",
    },
    {
      name: "Sports",
      icon: "/bell-icon.png",
      slug: "Sports",
    },
    {
      name: "Arts & Theatre",
      icon: "/bell-icon.png",
      slug: "Arts-Theatre",
    },
    {
      name: "Film",
      icon: "/bell-icon.png",
      slug: "Film",
    },
    {
      name: "Miscellaneous",
      icon: "/bell-icon.png",
      slug: "Miscellaneous",
    },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category");

  const handlechange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "All");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => handlechange(category.slug)}
          className={`flex items-center align-middle gap-1 cursor-pointer px-2  py-1 rounded-md hover:shadow-md ${
            selectedCategory === category.slug ? " bg-white" : "text-gray-400"
          }`}
        >
          <Image
            src={`${category.icon}`}
            alt={category.name}
            width={16}
            height={16}
          />
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
