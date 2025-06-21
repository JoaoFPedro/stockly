import { db } from "@/app/_lib/prisma";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}
export interface SaleDto {
  id: string;
  productNames: string;
  totalAmount: number;
  totalQuantity: number;
  date: Date;
  saleProducts: SaleProductDto[];
}
export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProcucts: {
        include: { product: true },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    productNames: sale.saleProcucts
      .map((saleProduct) => saleProduct.product.name)
      .join("-"),
    date: sale.date,
    totalAmount: sale.saleProcucts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.product.price),
      0,
    ),
    totalQuantity: sale.saleProcucts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
    saleProducts: sale.saleProcucts.map(
      (saleProduct): SaleProductDto => ({
        productId: saleProduct.productId,
        productName: saleProduct.product.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
      }),
    ),
  }));
};
