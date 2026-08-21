"use server";

import { revalidatePath } from "next/cache";

// Server Actions run on the Node.js server itself. 
// We use 127.0.0.1 to avoid public IP hairpin NAT routing issues on VPS platforms like AWS.
const API_URL = "http://127.0.0.1:5145/api/products";

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

    if (!res.ok) {
      const errText = await res.text();
      console.error("Backend error:", errText);
      throw new Error(`Failed to create product: ${errText}`);
    }
    
    revalidatePath("/store");
    revalidatePath("/admin");
    return await res.json();
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message || "Failed to create product" };
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
