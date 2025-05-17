"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MoneyInput } from "./ui/money-input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  productName: z.string().min(1, "Nome é obrigatório"),
  productPrice: z.number().positive("Preço deve ser positivo"),
  productAmount: z.number().positive("Quantidade deve ser positiva"),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertProduct = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productPrice: 0,
      productAmount: 1,
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="hover:bg-ghost bg-green-500">
            <PlusIcon /> Adicionar Produto
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Adicione um produto novo</DialogTitle>
            <DialogDescription>
              Insira as informações para add um produto novo
            </DialogDescription>
          </DialogHeader>
          <div className="w-[350px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nome do produto" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço do Produto</FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="Digite o valor do produto."
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantidade"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose asChild>
                  <Button variant="outline" className="mr-3">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </form>
            </Form>
          </div>{" "}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpsertProduct;
