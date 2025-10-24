import type { Metadata } from "next";
// import { getCurrentUser } from "./api/build-client";
import Header from "./components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ticketing",
  description: "developed by Risvan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const currentUser = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body data-new-gr-c-s-check-loaded="14.1232.0" data-gr-ext-installed="">
        <Header />
        {children}
      </body>
    </html>
  );
}
