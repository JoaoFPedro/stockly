"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteProductButton from "./DeleteProductButton";
import EditTransactionButton from "./EditTransactionButton";
import { ProductsDto } from "@/app/_data-access/product/get-products";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
};

export const productsColum: ColumnDef<ProductsDto>[] = [
  {
    accessorKey: "name",
    header: "Produtos",
  },
  {
    accessorKey: "price",
    header: "Valor unitário(R$)",
    cell: ({ row: { original: product } }) => {
      const amount = Number(product.price);
      const formattedAmount = amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      return formattedAmount;
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return label;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",

    cell: ({ row: { original: products } }) => {
      return (
        <>
          <EditTransactionButton product={products} />
          <DeleteProductButton productId={products.id} />
        </>
      );
    },
  },
];
