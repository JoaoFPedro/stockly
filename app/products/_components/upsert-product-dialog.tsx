"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import { MoneyInput } from "../../_components/ui/money-input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/ui/dialog";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { upsertProduct } from "../../_actions/add-products";
import { useState } from "react";
import {
  upsertProductSchema,
  UpsertProductSchema,
} from "@/app/_actions/add-products/schema";

// const formSchema = z.object({
//   name: z.string().trim().min(1, "Nome é obrigatório"),
//   price: z.number().min(0.01).positive("Preço deve ser positivo"),
//   stock: z.coerce.number().positive("Quantidade deve ser positiva"),
// });

// type FormSchema = z.infer<typeof formSchema>;

const UpsertProduct = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = async (data: UpsertProductSchema) => {
    console.log(data);
    try {
      await upsertProduct(data);
      setDialogIsOpen(false);
    } catch (error) {
      console.log("error while adding product", error);
    }
  };
  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
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
                  name="name"
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço do Produto</FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="Digite o valor do produto."
                          value={field.value}
                          onValueChange={({ floatValue }) =>
                            field.onChange(floatValue)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantidade"
                          type="number"
                          value={field.value ?? 1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                </Button>
              </form>
            </Form>
          </div>{" "}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpsertProduct;
