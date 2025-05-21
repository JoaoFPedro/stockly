"use client";

import { Product } from "@/app/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import DeleteProductButton from "./DeleteProductButton";
import EditTransactionButton from "./EditTransactionButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface TableColumsProps extends Product {
  status: string;
}
const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
};

export const productsColum: ColumnDef<TableColumsProps>[] = [
  {
    accessorKey: "name",
    header: "Produtos",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
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
    header: "",
    cell: ({ row: { original: products } }) => {
      return (
        <div className="flex space-x-1">
          <EditTransactionButton product={products} />
          <DeleteProductButton product={products} />
        </div>
      );
    },
  },
];
