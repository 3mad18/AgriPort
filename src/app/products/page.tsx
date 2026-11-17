import { Suspense } from "react";
import { getLiveProductsServer } from "@/lib/server-products";
import { ProductsClientView } from "@/components/products/products-client-view";

async function ProductsList() {
  const initialProducts = await getLiveProductsServer();
  return <ProductsClientView initialProducts={initialProducts} />;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsList />
    </Suspense>
  );
}
