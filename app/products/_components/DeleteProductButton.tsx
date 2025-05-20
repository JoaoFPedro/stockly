import { Button } from "@/app/_components/ui/button";
import { Product } from "@/app/generated/prisma/client";

interface DeleteProductButtonProps {
  products: Product;
}

const DeleteProductButton = (product: DeleteProductButtonProps) => {
  const handleDeleteButton = () => {
    console.log("PRODUCTS*****", product);
  };
  return (
    <>
      <Button onClick={handleDeleteButton}>Delete Button</Button>
    </>
  );
};

export default DeleteProductButton;
