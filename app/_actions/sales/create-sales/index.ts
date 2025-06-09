"use server";

import { db } from "@/app/_lib/prisma";
import { createSalesSchema, CreateSalesSchema } from "./schema";

export const createSale = async (data: CreateSalesSchema) => {
  createSalesSchema.parse(data);
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });
  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });

    if (!productFromDb) {
      throw new Error("Product not found");
    }
    const isProductOutOfStock = product.quantity > productFromDb.stock;

    if (isProductOutOfStock) {
      throw new Error("Product out of stock");
    }
    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });
    await db.product.update({
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
};
