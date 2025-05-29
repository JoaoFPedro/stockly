"use client";

import { Sale } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// interface TableColumsProps extends Sale {

// }

export const SalesColum: ColumnDef<Sale>[] = [
  {
    accessorKey: "name",
    header: "Produtos",
  },

  {
    accessorKey: "quantity",
    header: "Quantidade de Produto",
    cell: ({ row: { original: sale } }) => {
      const saleQuantity = Number(sale.quantity);

      return saleQuantity;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row: { original: sales } }) => {
      const formattedDate = new Date(sales.createdAt).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      );
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
