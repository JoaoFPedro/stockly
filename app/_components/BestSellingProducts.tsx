"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BestSellingProduct } from "../_data-access/get-dashboard-values";
import { formatCurrency } from "../_helpers/format-currency";
import { Badge } from "./ui/badge";
import { getStatusLabel } from "../products/_components/table-columns";

interface BestSellingProductProps {
  product: BestSellingProduct[];
}
const BestSellingProducts = ({ product }: BestSellingProductProps) => {
  // Agrupa quantidades por id

  {
    /*
    Esse trecho de codigo seria utilizado para validar se o item é um array, ja que a tipagem no BestSellingProduct esperava algo assim:
    export interface BestSellingProduct {
  name: string[];
  quantity: number;
  id: string[];
  price: string[];

  // const quantityById: Record<string, number> = {};
  // product.forEach((item) => {
  //   const id = Array.isArray(item.id) ? item.id[0] : item.id;
  //   quantityById[id] = (quantityById[id] || 0) + item.quantity;
  // });
}
    */
  }
  const quantityById: Record<string, number> = {};
  product.forEach((item) => {
    const id = item.id;
    quantityById[id] = (quantityById[id] || 0) + item.quantity;
  });
  const sortedProducts = [...product].sort((a, b) => {
    const idA = a.id;
    const idB = b.id;
    return quantityById[idB] - quantityById[idA];
  });
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Produtos mais vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedProducts.map((product) => {
            const id = Array.isArray(product.id) ? product.id[0] : product.id;
            const productQuantity = product.quantity > 1;
            const stock = getStatusLabel(product.status);

            return (
              <div key={id} className="flex justify-between space-y-4">
                <div className="align-baseline">
                  <Badge
                    variant="secondary"
                    className={
                      stock == "Em estoque"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {stock}
                  </Badge>
                  <div className="px-1">
                    <p>{product.name}</p>

                    <span className="text-xs text-slate-500">
                      {formatCurrency(Number(product.price))}
                    </span>
                  </div>
                </div>
                <div>
                  {" "}
                  <span className="text-xs text-slate-700">
                    {productQuantity
                      ? `${quantityById[id]} vendidos`
                      : `${quantityById[id]} vendido`}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default BestSellingProducts;
