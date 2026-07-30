import { getProducts } from "@/actions/product";
import { ProductForm } from "./components/product-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const result = await getProducts();
  const products = result.success ? result.products : [];

  return (
    <div>
      <ProductForm products={products || []} />
    </div>
  );
}
