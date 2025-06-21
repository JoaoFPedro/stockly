"use client";
import { Button } from "@/app/_components/ui/button";

import { useState } from "react";
import UpsertSaleDialog from "./upsert-sale-dialog";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductsDto } from "@/app/_data-access/product/get-products";
import { SaleDto } from "@/app/_data-access/sales/get-sales";
import { Edit2Icon } from "lucide-react";

interface EditSalesButtonProps {
  sale: Pick<SaleDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductsDto[];
}
const EditaSalesButton = ({
  sale,
  productOptions,
  products,
}: EditSalesButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("PRODUCTS", products);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Edit2Icon />
      </Button>
      <UpsertSaleDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productOptions={productOptions}
        products={products}
        defaultValue={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
          quantity: saleProduct.quantity,
        }))}
        saleId={sale.id}
      />
    </>
  );
};

export default EditaSalesButton;
