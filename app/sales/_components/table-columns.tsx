"use client";

import { SaleDto } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/_helpers/format-currency";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// interface TableColumsProps extends Sale {

// }

export const salesColum: ColumnDef<SaleDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },

  {
    header: "Quantidade de Produto",
    cell: ({
      row: {
        original: { totalQuantity },
      },
    }) => totalQuantity,
  },
  {
    header: "Valor total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },

  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row: { original: sales } }) => {
      const formattedDate = new Date(sales.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return formattedDate;
    },
  },
  // {
  //   accessorKey: "actions",
  //   header: "Ações",

  //   cell: ({ row: { original: products } }) => {
  //     return (
  //       <>
  //         {/* <EditTransactionButton product={products} />
  //         <DeleteProductButton productId={products.id} /> */}
  //       </>
  //     );
  //   },
  // },
];
