"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/header";
interface CurrentUser {
  email: string;
  id: string;
  iat: number;
}
export default function Home() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get("/api/users/currentuser");
        setCurrentUser(data.currentUser);
      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <>
      <Header email={currentUser?.email} />
    </>
  );
}
