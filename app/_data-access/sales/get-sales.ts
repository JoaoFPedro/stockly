"use server";
import { db } from "@/app/_lib/prisma";

export const getSalesProducts = async () => {
  await db.sale.findMany({});
};
