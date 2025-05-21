"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";

interface UpserTransactionProps {
  id?: string;
  name: string;
  price: number;
  stock: number;
}

export const upsertProduct = async (params: UpserTransactionProps) => {
  upsertProductSchema.parse(params);
  console.log("PRODUCTS****", params);
  await db.product.upsert({
    update: params,
    create: params,
    where: {
      id: params.id ?? "",
    },
  });
  revalidatePath("/");
};
