import { Suspense } from "react";
import CartPage from "./CartPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartPage />
    </Suspense>
  );
}
