import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center gap-1">
          {" "}
          <Image
            src="/ticketing-logo.png"
            alt="need to update"
            width={36}
            height={36}
          />
          <p className="hidden md:block text-md font-medium capitalize text-amber-50">
            Ticketing
          </p>
        </Link>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Ticketing.
        </p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">links</p>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">links</p>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">links</p>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
    </div>
  );
};

export default Footer;
