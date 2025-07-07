import { db } from "@/app/_lib/prisma";
export interface BestSellingProduct {
  name: string;
  quantity: number;
  id: string;
  price: string;
  status: "IN_STOCK" | "OUT_OF_STOCK";
}

export const getDashboard = async () => {
  const sales = await db.sale.findMany({
    include: {
      saleProcucts: {
        include: { product: true },
      },
    },
  });
  const products = await db.product.findMany({});
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
    status: item.saleProcucts.map((saleProduct) => {
      return saleProduct.product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK";
    }),
  }));

  const totalAmount = sales.reduce((acc, sale) => {
    const saleTotal = sale.saleProcucts.reduce(
      (saleAcc, saleProduct) =>
        saleAcc + saleProduct.quantity * Number(saleProduct.product.price),
      0,
    );
    return acc + saleTotal;
  }, 0);
  const totalSellingProducts = sales.reduce((acc, item) => {
    return (
      acc +
      item.saleProcucts.reduce(
        (saleAcc, saleProduct) => saleAcc + saleProduct.quantity,
        0,
      )
    );
  }, 0);
  const totalStock = products.reduce((acc, item) => acc + item.stock, 0);
  const totalProducts = products.length;
  console.log("PRODUCTS*******", products.length);

  return {
    totalAmount,
    totalBestSellingProduct,
    totalSellingProducts,
    totalStock,
    totalProducts,
  };
};
