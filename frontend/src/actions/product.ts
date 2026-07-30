"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL 
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products` 
  : "http://localhost:5145/api/products";

export async function getProducts() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const buyUrl = formData.get("buyUrl") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, videoUrl, category, description, buyUrl, thumbnailUrl }),
    });

    if (!res.ok) throw new Error("Failed to create product");
    
    revalidatePath("/store");
    revalidatePath("/admin");
    return await res.json();
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const buyUrl = formData.get("buyUrl") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, videoUrl, category, description, buyUrl, thumbnailUrl }),
    });

    if (!res.ok) throw new Error("Failed to update product");
    
    revalidatePath("/store");
    revalidatePath("/admin");
    return await res.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete product");

    revalidatePath("/store");
    revalidatePath("/admin");
    return await res.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
