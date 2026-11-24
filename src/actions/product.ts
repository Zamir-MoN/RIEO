"use server";

import { revalidatePath } from "next/cache";

export interface ProductItem {
  id: string;
  title: string;
  price: string;
  videoUrl: string;
  category: string;
  description?: string | null;
  buyUrl?: string | null;
  thumbnailUrl?: string | null;
  createdAt: string;
}

// In-memory / static product list for standalone frontend operations
const productsStore: ProductItem[] = [
  {
    id: "cms7e0z9100009eh1daz38nu7",
    title: "Cinematic LUTs Pack Vol. 1",
    price: "$49",
    videoUrl: "/hero-bg-2.mp4",
    category: "Color Grading",
    description: "Handcrafted cinematic LUTs designed to give your footage a high-end film look instantly.",
    buyUrl: null,
    thumbnailUrl: "/thumbnails/thumb1.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cms7e0z9900019eh1ztwlqddb",
    title: "Dynamic Transitions Bundle",
    price: "$39",
    videoUrl: "",
    category: "Motion Graphics",
    description: "Seamless drag-and-drop dynamic transitions for Premiere Pro, After Effects, and DaVinci Resolve.",
    buyUrl: null,
    thumbnailUrl: "/thumbnails/thumb2.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cms7e0z9900029eh1kntc901a",
    title: "Kinetic Typography Kit",
    price: "$59",
    videoUrl: "",
    category: "After Effects",
    description: "Modular animated title templates and rhythmic text reveals built for high-retention edits.",
    buyUrl: null,
    thumbnailUrl: "/thumbnails/thumb3.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cms7e0z9900039eh1flm842bc",
    title: "Film Grain & Halation Suite",
    price: "$29",
    videoUrl: "",
    category: "Film Emulation",
    description: "Authentic 16mm and 35mm organic grain overlays with warm optical halation profiles.",
    buyUrl: null,
    thumbnailUrl: "/thumbnails/thumb4.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cms7e0z9900049eh1snd731de",
    title: "Sound Design & SFX Vault",
    price: "$45",
    videoUrl: "",
    category: "Audio Pack",
    description: "250+ studio-mastered risers, hits, whooshes, and foley textures for commercial pacing.",
    buyUrl: null,
    thumbnailUrl: "/thumbnails/thumb5.webp",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cms7e0z9900059eh1vfx519fg",
    title: "3D Camera & Hologram Presets",
    price: "$69",
    videoUrl: "",
    category: "VFX & 3D",
    description: "Spatial HUD elements, 3D camera rigs, and futuristic UI overlays ready to drop into your timeline.",
    buyUrl: null,
    thumbnailUrl: "/thumbnails/thumb6.jpg",
    createdAt: new Date().toISOString(),
  },
];

export async function getProducts() {
  return { success: true, products: productsStore };
}

export async function getProductById(id: string) {
  const product = productsStore.find((p) => p.id === id);
  if (!product) return { success: false, error: "Product not found" };
  return { success: true, product };
}

export async function createProduct(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const category = formData.get("category") as string;
    const description = (formData.get("description") as string) || null;
    const buyUrl = (formData.get("buyUrl") as string) || null;
    const thumbnailUrl = (formData.get("thumbnailUrl") as string) || null;

    const newProduct: ProductItem = {
      id: "prod_" + Date.now(),
      title,
      price,
      videoUrl,
      category,
      description,
      buyUrl,
      thumbnailUrl,
      createdAt: new Date().toISOString(),
    };

    productsStore.unshift(newProduct);

    revalidatePath("/store");
    revalidatePath("/admin");
    return { success: true, product: newProduct };
  } catch (error: any) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message || "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const index = productsStore.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product not found");

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const category = formData.get("category") as string;
    const description = (formData.get("description") as string) || null;
    const buyUrl = (formData.get("buyUrl") as string) || null;
    const thumbnailUrl = (formData.get("thumbnailUrl") as string) || null;

    productsStore[index] = {
      ...productsStore[index],
      title,
      price,
      videoUrl,
      category,
      description,
      buyUrl,
      thumbnailUrl,
    };

    revalidatePath("/store");
    revalidatePath("/admin");
    return { success: true, product: productsStore[index] };
  } catch (error: any) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message || "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const index = productsStore.findIndex((p) => p.id === id);
    if (index !== -1) {
      productsStore.splice(index, 1);
    }
    revalidatePath("/store");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message || "Failed to delete product" };
  }
}
