"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/next-safe-action";

interface UpserTransactionProps {
  id?: string;
  name: string;
  price: number;
  stock: number;
}

export const upsertProductAction = actionClient
  .inputSchema(upsertProductSchema)
  .action(async ({ parsedInput }) => {
    await db.product.upsert({
      update: parsedInput,
      create: parsedInput,
      where: {
        id: parsedInput.id ?? "",
      },
    });
    revalidatePath("/");
  });

export const upsertProduct = async (params: UpserTransactionProps) => {
  upsertProductSchema.parse(params);
  await db.product.upsert({
    update: params,
    create: params,
    where: {
      id: params.id ?? "",
    },
  });
  revalidatePath("/");
};
