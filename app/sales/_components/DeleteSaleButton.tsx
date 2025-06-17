import { deleteSale } from "@/app/_actions/sales/delate-sales";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteSaleButtonProps {
  saleId: string;
}

const DeleteSaleButton = ({ saleId }: DeleteSaleButtonProps) => {
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda excluído com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao excluir a venda.");
    },
  });

  const handleDeleteButton = () => executeDeleteSale({ id: saleId });

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
            <DialogTitle>A venda será completamente excluída</DialogTitle>
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

export default DeleteSaleButton;
