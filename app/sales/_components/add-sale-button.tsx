"use client";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleDialog from "./upsert-sale-dialog";

const SaleButton = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="hover:bg-ghost bg-green-500">
          <Button>Adicionar venda </Button>
        </SheetTrigger>
        <UpsertSaleDialog />
      </Sheet>
    </>
  );
};

export default SaleButton;
