import { db } from "@/app/_lib/prisma";
export interface BestSellingProduct {
  name: string[];
  quantity: number;
  id: string[];
  price: string[];
}

export const getDashboard = async () => {
  const sales = await db.sale.findMany({
    include: {
      saleProcucts: {
        include: { product: true },
      },
    },
  });
  // console.log(
  //   "SALESACTION***",
  //   sales.map((salesProduct) =>
  //   ),
  // );
  const totalBestSellingProduct = sales.map((item) => ({
    name: item.saleProcucts.map((saleProduct) => saleProduct.product.name),
    quantity: item.saleProcucts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
    id: item.saleProcucts.map((saleProduct) => saleProduct.product.id),
    price: item.saleProcucts.map((saleProduct) =>
      saleProduct.product.price.toString(),
    ),
  }));
  console.log("DKSAODKSPKDOPA***", totalBestSellingProduct);
  const totalAmount = sales.reduce((acc, sale) => {
    const saleTotal = sale.saleProcucts.reduce(
      (saleAcc, saleProduct) =>
        saleAcc + saleProduct.quantity * Number(saleProduct.product.price),
      0,
    );
    return acc + saleTotal;
  }, 0);
  return {
    totalAmount,
    totalBestSellingProduct,
  };
};
