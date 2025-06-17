"use server";
import { db } from "@/app/_lib/prisma";
import { deleteProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/next-safe-action";
import { revalidatePath } from "next/cache";

export const deleteProduct = actionClient
  .inputSchema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id: id ?? "",
      },
    });
    revalidatePath("/products");
  });
