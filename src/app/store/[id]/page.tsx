import { getProductById } from "@/actions/product";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  
  const result = await getProductById(params.id);
  
  if (!result.success || !result.product) {
    notFound();
  }

  return <ProductDetailClient product={result.product} />;
}
