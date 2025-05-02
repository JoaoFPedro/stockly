import Image from "next/image";
import { db } from "./_lib/prisma";

export default async function Home() {
  const prisma = await db.product.findMany({});

  return (
    <>
      <div>
        {prisma.map((item) => (
          <h1>{item.name}</h1>
        ))}
      </div>
    </>
  );
}
