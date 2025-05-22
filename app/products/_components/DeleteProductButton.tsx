import { deleteProduct } from "@/app/_actions/delete-products";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteProductButtonProps {
  productId: string;
}

const DeleteProductButton = ({ productId }: DeleteProductButtonProps) => {
  const handleDeleteButton = async () => {
    console.log("PRODUCTS*****", productId);
    await deleteProduct({ id: productId });
    toast.success("Produto excluido com sucesso");
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <Trash2Icon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>O produto será completamente excluído</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <div className="space-x-2.5">
                <Button type="submit">Cancelar</Button>
                <Button
                  onClick={handleDeleteButton}
                  variant="secondary"
                  className="bg-red-800 text-white"
                >
                  Deletar
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProductButton;
