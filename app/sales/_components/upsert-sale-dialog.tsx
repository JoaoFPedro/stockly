import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { ComboboxSales } from "./combobox-sales";

interface SalesFormProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const UpsertSaleDialog = ({ isOpen, setIsOpen }: SalesFormProps) => {
  const onSubmit = () => {
    setIsOpen?.(false);
  };
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Adicionar Venda</SheetTitle>
        <SheetDescription>
          Insira as informações de venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <div className="p-4">
        <div className="">
          <h1>Produtos</h1>
        </div>
        <ComboboxSales />
      </div>
      <SheetFooter>
        <div className="flex w-full gap-3">
          <SheetClose asChild>
            <Button
              variant="outline"
              type="reset"
              className="bg-muted w-1/2 border border-gray-300 text-black hover:bg-gray-100"
            >
              Cancelar
            </Button>
          </SheetClose>
          <Button
            type="submit"
            className="w-1/2 bg-green-500 text-white hover:bg-green-600"
          >
            Finalizar
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSaleDialog;
