"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

type FormValues = {
  name: string;
  price: number;
  stock: number;
};

export const upsertProduct = async (data: FormValues) => {
  await db.product.create({
    data,
  });
  revalidatePath("/");
};
