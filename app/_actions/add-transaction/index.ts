"use server";
import { db } from "@/app/_lib/prisma";

type FormValues = {
  productName: string;
  productPrice: number;
  productAmount: number;
};

export const upsertProduct = async (params: FormValues) => {
  await db.product.create({
    data: {
      name: params.productName,
      price: params.productPrice,
      stock: params.productAmount,
    },
  });
};
