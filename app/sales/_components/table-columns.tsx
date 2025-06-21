"use client";

import { SaleDto } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/_helpers/format-currency";
import { ColumnDef } from "@tanstack/react-table";
import DeleteSaleButton from "./DeleteSaleButton";
import EditaSalesButton from "./EditSalesButton";
import { ProductsDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// interface TableColumsProps extends Sale {

// }
interface SaleTableColumn extends SaleDto {
  products: ProductsDto[];
  productsOptions: ComboboxOption[];
}

export const salesColum: ColumnDef<SaleTableColumn>[] = [
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
  {
    header: "Ações",

    cell: ({ row: { original: sale } }) => {
      console.log("SALEPRODUCTOPTIONS****", sale.productsOptions);
      return (
        <>
          <EditaSalesButton
            sale={sale}
            productOptions={sale.productsOptions}
            products={sale.products}
          />
          <DeleteSaleButton saleId={sale.id} />
        </>
      );
    },
  },
];
