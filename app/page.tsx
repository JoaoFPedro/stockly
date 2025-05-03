import { db } from "./_lib/prisma";
import { Button } from "./_components/ui/button";
import { PlusIcon } from "lucide-react";

export default async function Home() {
  const prisma = await db.product.findMany({});

  return <>{/* <ProductsPage /> */}</>;
}
