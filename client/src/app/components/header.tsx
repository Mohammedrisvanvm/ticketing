import Link from "next/link";

export default function Header({ email }: { email: string | undefined }) {
  const links = [
    !email && { href: "/auth/signin", label: "Sign In" },
    !email && { href: "/auth/signup", label: "Sign Up" },
    email && { href: "/auth/signout", label: "Sign Out" },
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
