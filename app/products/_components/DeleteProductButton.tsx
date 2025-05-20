import { deleteProduct } from "@/app/_actions/delete-products";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@/app/generated/prisma/client";

interface DeleteProductButtonProps {
  product: Product;
}

const DeleteProductButton = ({ product }: DeleteProductButtonProps) => {
  const handleDeleteButton = async () => {
    console.log("PRODUCTS*****", product);
    await deleteProduct(product.id);
  };
  return (
    <>
      <Button onClick={handleDeleteButton}>Delete Button</Button>
    </>
  );
};

export default DeleteProductButton;
