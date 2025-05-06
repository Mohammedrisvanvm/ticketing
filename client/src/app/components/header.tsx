"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  iat: number;
}

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.get("/api/users/currentuser");

      setCurrentUser(data.currentUser?.email || null);
    }

    fetchUser();
  }, []);
  console.log(currentUser);
  

  const links = [
    !currentUser && { href: "/auth/signin", label: "Sign In" },
    !currentUser && { href: "/auth/signup", label: "Sign Up" },
    currentUser && { href: "/auth/signout", label: "Sign Out" },
  ].filter(Boolean) as { href: string; label: string }[];

  const linkItems = links.map(({ href, label }) => (
    <li key={href} className="navbar-item">
      <Link href={href}> {label}</Link>
    </li>
  ));

  return (
    <header className="container bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold navbar-brand hover:text-gray-400"
          >
            Ticketing
          </Link>
        </div>
        <div className="space-x-4">
          {" "}
          <ul className="flex justify-between space-x-4">{linkItems}</ul>{" "}
        </div>
      </div>
    </header>
  );
}
