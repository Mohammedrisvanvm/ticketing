"use client";
import { useEffect } from "react";
import Dashboard from "./dashboard/page";
export default function Home() {
  useEffect(() => {
    // getCurrentUser();
  }, []);
  return (
    <>
      <Dashboard />
    </>
  );
}
