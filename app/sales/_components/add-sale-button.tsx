"use client";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import SaleForm from "./sale-form";

const SaleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="hover:bg-ghost bg-green-500"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon />
        Adicionar Venda
      </Button>

      <SaleForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default SaleButton;
