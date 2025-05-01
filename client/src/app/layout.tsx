import type { Metadata } from "next";
import "./globals.css";
import Home from "./page";

export const metadata: Metadata = {
  title: "Ticketing",
  description: "developed by Risvan",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body data-new-gr-c-s-check-loaded="14.1232.0" data-gr-ext-installed="">
      
        {children}
      </body>
    </html>
  );
};


