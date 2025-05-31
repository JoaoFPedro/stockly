"use client";
import { Button } from "@/app/_components/ui/button";
import { useForm } from "react-hook-form";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

import {
  UpsertSaleSchema,
  upsertSalesSchema,
} from "@/app/_actions/get-products/schema";
import { ComboboxOption, ComboboxSales } from "./combobox-sales";

interface SalesFormProps {
  setIsOpen?: (isOpen: boolean) => void;
  products: ComboboxOption[];
}

const UpsertSaleDialog = ({ products }: SalesFormProps) => {
  console.log("DKSOPAKDPOAPDKOA**", products);
  const form = useForm<UpsertSaleSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertSalesSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });
  const onSubmit = () => {
    // setIsOpen?.(false);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel>Nome do Produto:</FormLabel>
                  <FormControl>
                    <ComboboxSales
                      {...field}
                      placeholder="Escolha o produto"
                      options={products}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel>Quantidade:</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*                 
                <DialogClose asChild>
                  <Button variant="outline" className="mr-3" type="reset">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  value="outline"
                  className="bg-green-500"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="animate-spin" />
                  )}
                  Salvar
                </Button> */}
          </form>
        </Form>
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
