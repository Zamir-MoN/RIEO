const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      title: "Cinematic LUTs Pack Vol. 1",
      price: "$49",
      videoUrl: "/hero-bg-2.mp4",
      category: "Color Grading",
    },
    {
      title: "Dynamic Transitions Bundle",
      price: "$39",
      videoUrl: "/hero-bg.mp4",
      category: "Motion Graphics",
    }
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p
    });
  }
  console.log("Seeded products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
