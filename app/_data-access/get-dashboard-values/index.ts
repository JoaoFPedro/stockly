import { db } from "@/app/_lib/prisma";

export const getDashboard = async () => {
  const sales = await db.sale.findMany({
    include: {
      saleProcucts: {
        include: { product: true },
      },
    },
  });
  const totalAmount = sales.reduce((acc, sale) => {
    const saleTotal = sale.saleProcucts.reduce(
      (saleAcc, saleProduct) =>
        saleAcc + saleProduct.quantity * Number(saleProduct.product.price),
      0,
    );
    return acc + saleTotal;
  }, 0);
  console.log("TOTALAMOUNT****", totalAmount);
  return {
    totalAmount,
  };
};
