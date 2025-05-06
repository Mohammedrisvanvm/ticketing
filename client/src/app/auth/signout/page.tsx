"use client";
import { useRequest } from "@/app/hooks/use-request";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function SignOut() {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });
  useEffect(() => {
    doRequest();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">You have been signed out</h1>
      <p className="text-lg">Thank you for using our service!</p>
      <p className="text-lg">We hope to see you again soon.</p>
      <p className="text-lg">
        If you have any questions, feel free to contact us.
      </p>
      <p className="text-lg">Have a great day!</p>
    </div>
  );
}
