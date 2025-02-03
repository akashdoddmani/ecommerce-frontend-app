import ProductList from "@/components/ProductList";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense>
          <ProductList />
        </Suspense>
      </main>
    </div>
  );
}
