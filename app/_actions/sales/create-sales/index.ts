"use server";

import { db } from "@/app/_lib/prisma";
import { createSalesSchema } from "./schema";
import { actionClient } from "@/app/_lib/next-safe-action";
import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
export const createSale = actionClient
  .schema(createSalesSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdate = Boolean(id);
    await db.$transaction(async (trx) => {
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProcucts: true },
        });
        if (!existingSale) return;
        await trx.sale.delete({
          where: { id },
        });
        for (const product of existingSale.saleProcucts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });
      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: {
            id: product.id,
          },
        });
        if (!productFromDb) {
          returnValidationErrors(createSalesSchema, {
            _errors: ["Product not found."],
          });
        }
        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(createSalesSchema, {
            _errors: ["Product out of stock."],
          });
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });
        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/", "layout");
  });
