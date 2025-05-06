import ProductsPage from "./products/page";

export default async function Home() {
  // const prisma = await db.product.findMany({});

  return (
    <>
      {" "}
      <ProductsPage />
    </>
  );
}
