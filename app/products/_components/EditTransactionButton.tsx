import { Button } from "@/app/_components/ui/button";
import { Product } from "@/app/generated/prisma";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import UpsertProduct from "./upsert-product-dialog";

interface EditTransactionButtonProps {
  product: Product;
}

const EditTransactionButton = ({ product }: EditTransactionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Edit2Icon />
      </Button>

      <UpsertProduct
        productId={product.id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultValue={{
          ...product,
          price: Number(product.price),
        }}
      />
    </>
  );
};

export default EditTransactionButton;
