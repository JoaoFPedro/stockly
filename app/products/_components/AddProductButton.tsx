"use client";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertProduct from "./upsert-product-dialog";

const AddProductButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon />
        Adicionar Produto
      </Button>

      <UpsertProduct setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default AddProductButton;
