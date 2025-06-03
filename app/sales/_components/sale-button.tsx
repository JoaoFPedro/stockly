"use client";
import { Button } from "@/app/_components/ui/button";
import UpsertSaleDialog from "./upsert-sale-dialog";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";
import { Product } from "@/app/generated/prisma";

interface SalesButtonProps {
  productOptions: ComboboxOption[];
  products: Product[];
}

const SaleButton = ({ productOptions, products }: SalesButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="hover:bg-ghost bg-green-500 text-white"
        onClick={() => setIsOpen(true)}
      >
        Adicionar venda{" "}
      </Button>

      <UpsertSaleDialog
        productOptions={productOptions}
        products={products}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </>
  );
};

export default SaleButton;
